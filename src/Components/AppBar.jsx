import React, { useState, useEffect } from "react";
import { Layout, Menu, Badge, Avatar, Drawer, Button, Dropdown } from "antd";
import { MenuOutlined, BellOutlined, UserOutlined, DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header } = Layout;

const AppBar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { image, name, description } = useSelector((state) => state.about);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Store the event for later use
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleMenuClick = () => {
    closeDrawer();
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the saved event
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleMenuClick}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleMenuClick}>
        <Link to="/goals">Goals</Link>
      </Menu.Item>
      <Menu.Item key="3" onClick={handleMenuClick}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      {/* <Menu.Item key="4" onClick={handleMenuClick}>
        <Link to="/settings">Settings</Link>
      </Menu.Item> */}
    </Menu>
  );

  return (
    <Header className="app-bar">
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        className="menu-icon"
      />

      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
        className="drawer-menu"
        footer={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleInstallClick}
            disabled={!deferredPrompt}
            style={{ width: "100%" }}
          >
            Install App
          </Button>
        }
        footerStyle={{ padding: '10px' }} // Optional: Adjust padding for the footer
      >
        <Menu mode="vertical">
          <Menu.Item key="1" onClick={handleMenuClick}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={handleMenuClick}>
            <Link to="/goals">Goals</Link>
          </Menu.Item>
          <Menu.Item key="3" onClick={handleMenuClick}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          {/* <Menu.Item key="4" onClick={handleMenuClick}>
            <Link to="/settings">Settings</Link>
          </Menu.Item> */}
        </Menu>
      </Drawer>

      <div className="right-menu">
        <Badge count={5}>
          <BellOutlined style={{ fontSize: "20px" }} />
        </Badge>

        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            style={{ marginLeft: 16, cursor: "pointer" }}
            src={image} // Use the image from Redux state
            icon={!image && <UserOutlined />} // Fallback to icon if no image
            size="large"
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppBar;
