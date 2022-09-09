import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    // console.log('logout')
    dispatch(logout())
    navigate('/')
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {/* <Nav.Link as={Link} to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Nav.Link> */}

                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser />
                  Sign-in
                </Nav.Link>
              )}
              {/* Visible for admin users: */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin Screens" id="adminmenu">
                  <NavDropdown.Item href="/admin/userlist">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/productlist">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/orderlist">
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
