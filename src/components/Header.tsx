import React from "react";
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Image,
  Text,
  Title,
  ActionIcon,
  Avatar,
  Divider,
  Indicator,
  useMantineTheme,
  useMantineColorScheme,
  ColorScheme
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import {
  ArrowsLeftRight,
  Bell,
  MessageCircle,
  Photo,
  Power,
  Search,
  Settings,
  Trash,
} from "tabler-icons-react";
import logo from "../assets/images/bpo-logo.png";
import { useAuth } from "react-oidc-context";
import { Sun, MoonStars } from 'tabler-icons-react';

const HEADER_HEIGHT = 54;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    cursor: "pointer",
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    // fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface MenuItem {
  title: string;
  icon?: string;
  to?: string;
  items?: MenuItem[];
}

interface AppHeaderProps {
  menuItems: MenuItem[];
  opened: boolean;
  toggleOpened: () => void;
  // colorScheme: ColorScheme;
  // toggleColorScheme: () => void;
}

export function AppHeader({
  menuItems,
  opened,
  toggleOpened,
  // colorScheme,
  // toggleColorScheme
}: AppHeaderProps) {  
  
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <Avatar size={40} src={logo}></Avatar>
          <Title order={5}>BPO FSM</Title>
          {/* <Group spacing={5} className={classes.links}>
            {items}
          </Group> */}
        </Group>
        <Group spacing={10}>
          <NotificationDropdown />
          <UserDropdown />
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}

const NotificationDropdown = () => {
  return (
    <Menu
      control={
        <Indicator color="red" size={10} withBorder>
          <ActionIcon size={34} variant="light">
            <Bell size={18} />
          </ActionIcon>
        </Indicator>
      }
      withArrow={true}
    >
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
      <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
      <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
      <Menu.Item
        icon={<Search size={14} />}
        rightSection={
          <Text size="xs" color="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item>
    </Menu>
  );
};

const UserDropdown = () => {
  const auth = useAuth();
  return (
    <Menu
      control={
        <Avatar
          size={34}
          component={ActionIcon}
          src={null}
          style={{ cursor: "pointer" }}
        >
          DH
        </Avatar>
      }
      withArrow={true}
    >
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
      <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
      <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
      <Menu.Item
        icon={<Search size={14} />}
        rightSection={
          <Text size="xs" color="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item>
      <Divider />
      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<ArrowsLeftRight size={14} />}>
        Transfer my data
      </Menu.Item>
      <Menu.Item color="red" icon={<Trash size={14} />}>
        Delete my account
      </Menu.Item>
      <Menu.Item
        color="red"
        icon={<Power size={14} />}
        onClick={() => auth.signoutRedirect()}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};
