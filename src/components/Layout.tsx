import { AppShell, Container, useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./Header";
import { AppNavbar } from "./NavBar";

export function Layout() {
  const theme = useMantineTheme();
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  
  const [opened, toggleOpened] = useBooleanToggle(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<AppNavbar opened={opened} />}
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      header={
        <AppHeader
          menuItems={[
            { title: "Dashboard", to: "/services" },
            {
              title: "Inquiries",
              items: [
                { title: "All", to: "/services" },
                { title: "My", to: "/services" },
              ],
            },
          ]}
          // colorScheme={colorScheme}
          // toggleColorScheme={toggleColorScheme}
          opened={opened}
          toggleOpened={() => toggleOpened()}
        />
      }
    >
      <Outlet />
    </AppShell>
  );
}

// <Header
// height={50}
// p="md"
// style={{ backgroundColor: theme.colors.gray[7] }}
// >
// <div
//   style={{ display: "flex", alignItems: "center", height: "100%" }}
// >
//   <MediaQuery largerThan="sm" styles={{ display: "none" }}>
//     <Burger
//       opened={opened}
//       onClick={() => setOpened((o) => !o)}
//       size="sm"
//       color={theme.colors.gray[6]}
//       mr="xl"
//     />
//   </MediaQuery>
//   <UnstyledButton component={Link} to="/services">
//     <Group spacing="xs">
//       <Avatar src={logo} size={30}></Avatar>
//       <Text weight={500} size="xl" color="white">
//         BPO FSM
//       </Text>
//     </Group>
//   </UnstyledButton>
//   <Group style={{ marginLeft: "auto" }} spacing="sm">
//     <Menu
//       control={
//         <Indicator color="red" size={10} withBorder>
//           <ActionIcon size={30} variant="light">
//             <Bell size={16} />
//           </ActionIcon>
//         </Indicator>
//       }
//       withArrow={true}
//     >
//       <Menu.Label>Application</Menu.Label>
//       <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
//       <Menu.Item icon={<MessageCircle size={14} />}>
//         Messages
//       </Menu.Item>
//       <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
//       <Menu.Item
//         icon={<Search size={14} />}
//         rightSection={
//           <Text size="xs" color="dimmed">
//             ⌘K
//           </Text>
//         }
//       >
//         Search
//       </Menu.Item>
//     </Menu>
//     <Menu
//       control={
//         <Avatar
//           size={30}
//           component="a"
//           src={null}
//           style={{ cursor: "pointer" }}
//         >
//           DH
//         </Avatar>
//       }
//       withArrow={true}
//     >
//       <Menu.Label>Application</Menu.Label>
//       <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
//       <Menu.Item icon={<MessageCircle size={14} />}>
//         Messages
//       </Menu.Item>
//       <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
//       <Menu.Item
//         icon={<Search size={14} />}
//         rightSection={
//           <Text size="xs" color="dimmed">
//             ⌘K
//           </Text>
//         }
//       >
//         Search
//       </Menu.Item>
//       <Divider />
//       <Menu.Label>Danger zone</Menu.Label>
//       <Menu.Item icon={<ArrowsLeftRight size={14} />}>
//         Transfer my data
//       </Menu.Item>
//       <Menu.Item color="red" icon={<Trash size={14} />}>
//         Delete my account
//       </Menu.Item>
//       <Menu.Item
//         color="red"
//         icon={<Power size={14} />}
//         onClick={() => auth.signoutRedirect()}
//       >
//         Logout
//       </Menu.Item>
//     </Menu>
//   </Group>
// </div>
// </Header>
