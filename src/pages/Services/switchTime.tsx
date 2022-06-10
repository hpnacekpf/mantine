import { Grid, NumberInput, Select, TextInput } from '@mantine/core';
import React from 'react';

const SwitchTime = ({form}:any): JSX.Element => {
  const durationDataTime = [
    { value: "1", label: "15 Minutes" },
    { value: "2", label: "30 Minutes" },
    { value: "3", label: "Hourly" },
    { value: "4", label: "Daily" },
    { value: "5", label: "Weekly" },
    { value: "6", label: "Fortnightly" },
    { value: "7", label: "Monthly" },
  ]

  return (
    <div>
      <Grid columns={24}>
        <Grid.Col span={12}>
          <NumberInput
            label="Standard rate"
            precision={2}
            placeholder="0.00"
            mt="sm"
            {...form.getInputProps('standardRate')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            style={{ marginTop: "16px" }}
            label="  "
            disabled={true}
            {...form.getInputProps('money')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            label="Duration"
            placeholder="Pick one"
            mt="sm"
            searchable
            data={durationDataTime}
            defaultValue="1"
            {...form.getInputProps('duration')}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SwitchTime;