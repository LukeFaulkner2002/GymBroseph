import React from "react";

function RegisterButton() {
	const goToRegister = (event) => {
		event.preventDefault();
		localStorage.removeItem("user_data");
		window.location.href = "/cardsreg";
	};

	return (
		<div id="registerButton">
			<button type="button" id="registerButton" className="buttons" onClick={goToRegister}>
				{" "}
				Register{" "}
			</button>
		</div>
	);
}

export default RegisterButton;
