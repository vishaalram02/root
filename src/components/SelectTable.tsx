import { useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export interface TableSelectionProps {
  selection: string[];
  setSelection: Function;
  data: { avatar: string; name: string; desc: string, start: string, end: string, id: string, status : string}[];
}

export function TableSelection({ data, selection, setSelection}: TableSelectionProps) {
  const { classes, cx } = useStyles();
  const toggleRow = (id: string) =>
    setSelection(selection.includes(id) ? selection.filter((item) => item !== id) : [...selection, id]
    );
  const toggleAll = () =>
    setSelection(selection.length === data.length ? [] : data.map((item) => item.id));

  const rows = data.filter((task) => (task.status === "unclaimed")).map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.desc}</td>
        <td>{item.start}</td>
        <td>{item.end}</td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Location</th>
            <th>End Location</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
