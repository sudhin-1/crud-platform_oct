import React from "react";
import { CiCircleChevDown, CiDollar, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

function Landing() {
	return (
		<>
			<div className="min-vh-100 container-fluid py-5">
				<div className="d-flex justify-content-center align-items-center mt-5">
					<div
						className="w-75 h-75 shadow rounded"
						style={{ padding: "100px" }}
					>
						<div className="d-flex align-items-center justify-content-center row">
							<h1
								className="text-center font-xl mb-4"
								style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}
							>
								Mark me : Digital Attendance Manager
							</h1>
							<p className="text-center fs-5">
								Smart Attendance Marker — a quick and reliable way to <br />{" "}
								record and manage attendance digitally. Stay organized, save
								time, and track attendance with just a click
							</p>
							<Link to={"/sign"} className="text-center">
								<button
									className="rounded-3 shadow fs-6 mt-5"
									style={{ width: "150px", height: "40px" }}
								>
									Start-now
								</button>
							</Link>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6 mt-5">
						<div className="ps-5 ms-5">
							<img
								className=""
								src="https://static.vecteezy.com/system/resources/previews/060/829/300/non_2x/man-playing-bingo-on-tablet-with-bingo-card-numbers-in-background-illustration-design-vector.jpg"
								alt=""
								style={{ height: "400px", width: "400px" }}
							/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="p-5 m-5">
							<h2 style={{ fontFamily: "'Rock Salt', cursive" }}>
								Hassle free marking
							</h2>
							<p className="pt-3">
								Monitor participation, Maintain records — Useful for reports,
								payroll, or grades. Helps in scheduling based on attendance
								trends.The Attendance Register helps record and manage
								attendance digitally. It ensures accurate tracking of presence
								and absence, making monitoring and reporting faster and more
								reliable.
							</p>
						</div>
					</div>
				</div>
				{/* icons section */}
				<div className="d-flex justify-content-center gap-5 pt-3 ">
					<div className="card rounded-4 mt-3" style={{ width: "18rem" }}>
						<div className="card-body text-center">
							<h5 className="card-title fw-bold fs-1 text-primary">
								<CiCircleChevDown />
							</h5>
							<p className="pt-3">
								Our system is designed to save time without compromising
								accuracy. Every feature works seamlessly to reduce manual effort
								and speed up your workflow. Efficiency isn’t just an option —
								it’s built in.
							</p>
						</div>
					</div>

					<div className="card rounded-4 mt-3" style={{ width: "18rem" }}>
						<div className="card-body text-center">
							<h5 className="card-title fw-bold fs-1 text-primary">
								<CiDollar />
							</h5>
							<p className="pt-3">
								This service is completely free, making it accessible to
								everyone. It removes financial barriers and ensures inclusivity.
								Anyone can benefit without worrying about cost.
							</p>
						</div>
					</div>

					<div className="card rounded-4 mt-3" style={{ width: "18rem" }}>
						<div className="card-body text-center">
							<h5 className="card-title fw-bold fs-1 text-primary">
								<CiUser />
							</h5>
							<p className="pt-3">
								Designed with simplicity in mind, the platform is easy to
								understand and use. It saves time and effort while guiding users
								naturally. Everyone can interact with it comfortably
							</p>
						</div>
					</div>
				</div>

				<div
					class="row g-0 justify-content-between bg-200 rounded-3 p-4 p-md-6 position-relative"
					style={{ marginTop: "6rem" }}
				>
					<img
						src="https://odoocdn.com/openerp_website/static/src/img/snippets/s_wd_testimonials/quote.svg"
						height="50px"
						className="ms-5 position-absolute top-0 translate-middle d-none d-md-inline"
						alt=""
					></img>
					<div className="w-75 bg-dark text-center rounded-4 mx-auto">
						<div className="p-5 fs-2 text-warning fst-italic">
							All done! Showing up is the first step toward achieving your
							goals—keep it going!
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Landing;
