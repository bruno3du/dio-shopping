/** @format */

import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {
	const url = 'http://localhost:5000/message';
	const [message, setMessage] = useState([]);
	const [author, setAuthor] = useState('');
	const [content, setContent] = useState('');
	const [errorMessage, setErrorMessage] = useState(false);
	const [successMessage, setSuccess] = useState(false);

	async function fetchMessages() {
		const response = await fetch(url);
		const data = await response.json();
		setMessage(data);
		setSuccess(false);
	}

	useEffect(() => {
		fetchMessages();
	}, []);

	const sendMessage = () => {
		// Toda vez que clicar vai resetar Erro
		setErrorMessage(false);
		if (!author || !content) {
			setErrorMessage(true);
			return setTimeout(() => {
				return setErrorMessage(false);
			}, 5000);
		}

		const bodyForm = {
			email: author,
			message: content,
		};

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyForm),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.id) {
					setSuccess(true);
					fetchMessages();
				}
			})
			.catch((err) => console.log(err));

		setAuthor('');
		setContent('');
	};

	return (
		<>
			<Grid container direction='row' xs={12}>
				<TextField
					id='name'
					label='Name'
					value={author}
					onChange={(event) => {
						setAuthor(event.target.value);
					}}
					fullWidth
				/>
				<TextField
					id='message'
					label='Message'
					value={content}
					onChange={(event) => {
						setContent(event.target.value);
					}}
					fullWidth
				/>
			</Grid>

			{errorMessage && (
				<div
					className='alert alert-warning alert-dismissible fade show mt-2'
					role='alert'>
					<strong>Por favor preencha todos os campos!</strong>
					<button
						type='button'
						className='btn-close'
						data-bs-dismiss='alert'
						aria-label='Close'></button>
				</div>
			)}

			{successMessage && (
				<div
					className='alert alert-success alert-dismissible fade show mt-2'
					role='alert'>
					<strong>Mensagem foi enviada</strong>
				</div>
			)}

			<Button
				onClick={sendMessage}
				className='mt-2'
				variant='contained'
				color='primary'>
				Sent
			</Button>

			{message.map((content) => {
				return (
					<div className='card mt-2' key={content.id}>
						<div className='card-body'>
							<h5 className='card-title'>{content.email}</h5>
							<p className='card-text'>{content.message}</p>
							<p className='card-text'>
								<small className='text-muted'>{content.created_at}</small>
							</p>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default Contatos;
