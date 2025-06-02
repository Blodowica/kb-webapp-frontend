import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HeaderComponent(props) {
  const { sections, showEditView, hideEditButton } = props;
  const setShowEditView = props.setShowEditView;
  const headerData = sections.find((s) => s.type === "header");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [editLayoutButtonOn, setEditLayoutButtonOn] = useState(false);

  const handleSearch = (e, btn) => {
    if (e.key === "Enter" || btn === "searchbtn") {
      navigate(`/Search?query=${searchQuery}`);
    }
  };

  const handleLogin = () => {
    //Redirect to auth0 login form
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: process.env.REACT_APP_HOME_URL } });
  };

  const handleEditorView = (showEditView, setShowEditView) => {
    if (!showEditView) {
      setShowEditView(true);
      setEditLayoutButtonOn(true);
    } else {
      setShowEditView(false);
      setEditLayoutButtonOn(false);
    }
  };

  if (!headerData || !headerData.headerComponents) return null;

  return headerData.headerComponents.map((component, id) => {
    const styles = JSON.parse(component.styling || "{}");
    const navLinks = JSON.parse(component.navlinks || "[]");
    const logoUrl = component.logoImage || "";

    return (
      <div key={id} style={styles.navbar}>
        {/* Left Section: Logo */}
        <div style={styles.leftSection}>
          {!hideEditButton ? (
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <Button
              id="EditorViewBtn"
                onClick={() => handleEditorView(showEditView, setShowEditView)}
                style={{
                  width: "130px",
                  alignItems: "center",
                  display: "flex",
                }}
                variant="warning"
              >
                {
                  !editLayoutButtonOn ? ("Edit Layout") : ("Stop Edit Layout")
                }
                
              </Button>
            </div>
          ) : null}
          <div
            style={styles.logoContainer}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logoUrl} alt="Logo" style={styles.logoImage} />
            <p style={styles.logoText}>{component.logotext}</p>
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <div id={`login-${component._id}`} style={styles.loginText}>
            {isAuthenticated ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <img
                  src={user.picture}
                  id="profileImage"
                  alt={`${user.name} avatar`}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                  }}
                />
                <span id="userNickname" style={{ color: "black" }}>{user.nickname}</span>
                <button 
                id="logoutUserButton"
                  style={{
                    color: "red",
                    background: "none",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div
                id={`login-${component._id}`}
                data-cy="login-link"
                style={styles.loginText}
                onClick={handleLogin}
              >
                Login
              </div>
            )}
          </div>

          <Row>
            {navLinks.map((link, i) => (
              <Col key={i}>
                <div style={styles.navText}>
                  <a
                    href={link.url}
                    style={{
                      textDecoration: "none",
                      color: "gray",
                      fontWeight: "lighter",
                      fontSize: "20px",
                    }}
                  >
                    {link.label}
                  </a>
                </div>
              </Col>
            ))}
          </Row>

          <div style={styles.searchRow}>
            <Form.Control
              type="search"
              id="SearchBar"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(e) => handleSearch(e)}
            />

            <div style={styles.radioGroup}>
              <input
                defaultChecked
                type="radio"
                name="filter"
                style={styles.radio}
              />
              <label> Catalog </label>
              <input type="radio" name="filter" style={styles.radio} />
              <label> Sites </label>
            </div>

            <button
              id={`search-btn-${component._id}`}
              onClick={(e) => handleSearch(e, "searchbtn")}
              style={styles.searchButton}
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    );
  });
}

export default HeaderComponent;
