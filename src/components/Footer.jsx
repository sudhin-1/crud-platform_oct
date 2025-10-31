import React from "react";
import "../css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
	return (
		<footer className="footer">
			<div className="footer-top">
				<div className="footer-section">
					<h3 className="footer-logo">MarkMe</h3>
					<p className="footer-description">
						Simplify attendance tracking and student management with MarkMe.
					</p>
				</div>

				<div className="footer-section">
					<h4>About</h4>
					<ul>
						<li>
							<a href="#">MarkMe</a>
						</li>
						<li>
							<a href="#">Features</a>
						</li>
						<li>
							<a href="#">Pricing</a>
						</li>
					</ul>
				</div>

				<div className="footer-section">
					<h4>Follow us</h4>
					<ul>
						<li>
							<a href="https://x.com/login">Twitter</a>
						</li>
						<li>
							<a href="https://www.facebook.com/">Facebook</a>
						</li>
					</ul>
				</div>

				<div className="footer-section">
					<h4>Legal</h4>
					<ul>
						<li>
							<a href="#">Privacy Policy</a>
						</li>
						<li>
							<a href="#">Terms & Conditions</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
