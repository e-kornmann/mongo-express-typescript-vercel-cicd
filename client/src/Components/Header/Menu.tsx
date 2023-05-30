import React, { useEffect, useState } from 'react';
import {  NavLink, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { db, firebaseAuth } from "../../firebase";
import { doc, getDoc } from 'firebase/firestore';
import Signout from '../Auth/Signout';
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from '../../store/slices/authSlice'
import cross from '../../Assets/delete.svg';
import burger from '../../Assets/burger.svg';
import { ReactComponent as Logo } from '../../Assets/tinysitters_logo.svg';
import { User } from "../../types";
import './menu.scss';




const Navbar = () => {
  const navigate = useNavigate();
	const dispatch = useDispatch<any>();
	const user: User = useSelector((state: any) => state.user);
	const { userId, firstName, lastName } = user;
	const location = useLocation();
	const [isAtLocation, setIsAtLocation] = useState(false);

	useEffect(() => {
		if (location.pathname === '/sitters') {
			setIsAtLocation(true);
		} else {
			setIsAtLocation(false);
		}
	}, [location]);

  const handleLogoClick = (e: React.MouseEvent) => {
    navigate('/');  
  };

	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const overlayStyle: React.CSSProperties = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: click ? 'rgba(34, 26, 34, 0.516)' : 'transparent',
		transition: 'background-color 0.2s ease-in-out',
		zIndex: click ? '51' : '-100',
		pointerEvents: click ? 'auto' : 'none'
	};


	const navbarBackground: React.CSSProperties = {
		position: 'sticky',
		top: 0,
		height: 45,
		backgroundColor: isAtLocation ? '#00C9B8' : '#FF5E54',
		zIndex: 10,
	}


	useEffect(() => {
		const listen = onAuthStateChanged(firebaseAuth, async (user: any) => {
			if (user && userId !== 'empty') {
				console.log("user is logged in");
				const docRef = doc(db, "users", user.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					const parsedkids = JSON.parse(data.kids)
					try {
						await dispatch(setUser({
							userId: user?.uid,
							userEmail: user.email,
							firstName: data?.firstName,
							lastName: data?.lastName,
							parent: data?.parent,
							street: data?.street,
							houseNumber: data?.houseNumber,
							zipCode: data?.zipCode,
							city: data?.city,
							telephoneNumber: data?.telephoneNumber,
							kids: parsedkids,
							notes: data?.notes,
						} as User));
						console.log('User info loaded succesfully');
					} catch (error) {
						console.error(error);
					};
				} else {
					dispatch(logout())
					console.log("No such document!");
				}
			}
		});
		return () => {
			listen();
		};
	}, [dispatch, userId]);



	return (
		<>




			<div style={navbarBackground} className="navbar-background">
				<nav className="navbar">
					<div className="navbar-container container">
						<div>
							<div style={overlayStyle} className="gray" onClick={closeMobileMenu}>&nbsp;</div>
						</div>
						
						<div className="menu-icon" onClick={handleClick}>
							{click ? <div className="cross"><img src={cross} alt="hide button" /></div> : <div className="burger"><img src={burger} alt="show menu button" /></div>}
						</div>
						<ul className={click ? "nav-menu active" : "nav-menu"}>
						<Logo onClick={handleLogoClick} className="navbar-logo" />

								
             
							
							{userId !== 'empty' ? (
								<>
									<div className="nav-nonlink">Signed in as:<br />{firstName} {lastName}</div>
									<li className="nav-item">
										<NavLink
											to="/mybookings"
											className={({ isActive }) =>
												"nav-links" + (isActive ? " activated" : "")
											}
											onClick={closeMobileMenu}
										>
											My Bookings
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink
											to="/profile"
											className={({ isActive }) =>
												"nav-links" + (isActive ? " activated" : "")
											}
											onClick={closeMobileMenu}
										>
											My Profile
										</NavLink>
									</li>


								</>

							) : (

								<li className="nav-item">
									<NavLink
										to="/login"
										className={({ isActive }) =>
											"nav-links" + (isActive ? " activated" : "")
										}
										onClick={closeMobileMenu}
									>
										Login
									</NavLink>
								</li>
							)}
							<li className="nav-item">
								<NavLink
									to="/calendar"
									className={({ isActive }) =>
										"nav-links" + (isActive ? " activated" : "")
									}
									onClick={closeMobileMenu}
								>
									Pick date
								</NavLink>
							</li>

							{userId !== 'empty' ? (
								<>


								
								<li className="nav-item">
									<div className="nav-links" onClick={closeMobileMenu}>
										<Signout />
									</div>
								</li>	
								<div className="nav-nonlink" style={{width: "185px"}}>
	&nbsp;
</div>
									</>								
								
							) : null}

						</ul>
					</div>
				</nav>
			</div>
		</>
	)
}

export default Navbar;
