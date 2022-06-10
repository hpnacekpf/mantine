import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";

export function Scheduler() {
  return (
    <ScheduleComponent height={500}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}
