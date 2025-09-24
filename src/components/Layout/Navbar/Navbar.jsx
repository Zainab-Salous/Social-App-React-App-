import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";


export function AppNav() { 
  const { token, setToken, userData } = useContext(AuthContext);
  
      const navigate = useNavigate()



      function handleSignOut(){
        setToken(null)
        localStorage.removeItem("token")
        navigate("/login")
    }
    
  return (
    <Navbar>
      <NavbarBrand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          AppSocial
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            userData ? (
              <Avatar
                alt="User settings"
                img={userData.photo}
                rounded
              />
            ) : (
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            )
          }
        >
          { token? (<>
                 {userData && <DropdownHeader>
            <span className="block text-sm">{userData.name}</span>
            <span className="block truncate text-sm font-medium">
              {userData.email}
            </span>
          </DropdownHeader>}
           <DropdownItem as={Link} to="/profile">
            Profile
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={handleSignOut} as="button">Sign out</DropdownItem>
          </>):(<>
              <DropdownItem as={Link} to="/login">
            Login
          </DropdownItem>
          <DropdownItem as={Link} to="/register">
            Register
          </DropdownItem></>)}
        
  
      
         
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={NavLink} to="/" active>
          <FaHome className="mr-2 w-5 h-5" />
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
