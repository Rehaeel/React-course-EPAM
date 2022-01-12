import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Announcement.css';

const Message = (props) => {
	return (
		<div id='backdrop'>
			<div id='message'>{props.message}</div>
		</div>
	);
};

export const Announcement = (props) => {
	const [isOpen, setIsOpen] = useState(true);

	return ReactDOM.createPortal(
		<Message
			message='siema wszystkim! WAZZUP! :D'
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		/>,
		document.getElementById('announcement')
	);
};
