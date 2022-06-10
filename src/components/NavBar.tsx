import {
  Navbar,
  ScrollArea,
  createStyles,
} from "@mantine/core";
import {
  Notes,
  PresentationAnalytics,
  Adjustments,
  Lifebuoy,
  Users,
  Circles,
  CalendarEvent,
  Home,
} from "tabler-icons-react";
import { LinksGroup } from "./NavbarLinkGroup";

const mockdata = [
  { label: "Trang chủ", icon: Home, link: "/services" },
  {
    label: "Yêu cầu",
    icon: Notes,
    initiallyOpened: true,
    links: [
      // { label: "Overview", link: "/servicesList" },
      { label: "Dịch vụ", link: "/services" },
      // { label: "Add", link: "/services/add" },
      { label: "Thể loại", link: "/services/categories" },
      // { label: "Update", link: "/services/update" },
      { label: "Forecasts", link: "/scheduler" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Đặt lịch",
    icon: CalendarEvent,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  {
    label: "Nhân sự",
    icon: Users,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  {
    label: "Khách hàng",
    icon: Circles,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  {
    label: "Báo cáo",
    icon: PresentationAnalytics,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  {
    label: "Quản trị",
    icon: Adjustments,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
  {
    label: "Trợ giúp",
    icon: Lifebuoy,
    links: [
      { label: "Hướng dẫn sử dụng", link: "/" },
      { label: "Thông tin phiên bản", link: "/" },
      { label: "Thông tin sản phẩm", link: "/" },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function AppNavbar({ opened }: { opened: boolean }) {
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar
      width={{ sm: 240 }}
      px="md"
      className={classes.navbar}
      hidden={!opened}
    >
      {/* <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Image src={logo} width={50} />
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
      </Navbar.Section> */}

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      {/* <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </Navbar.Section> */}
    </Navbar>
  );
}
