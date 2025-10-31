import { faClipboardUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

function Header() {
	const [isBouncing, setIsBouncing] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setIsBouncing(false), 1700);
		return () => clearTimeout(timer);
	}, []);
	return (
		<>
			<header className="header">
				<Link to={"/"} className="title">
					<FontAwesomeIcon icon={faClipboardUser} bounce={isBouncing} />
					<h1>Mark Me</h1>
				</Link>
				<div>
					<Link to={"/sign"} className="sign-in">
						SIGN IN
					</Link>
				</div>
			</header>
		</>
	);
}

export default Header;
