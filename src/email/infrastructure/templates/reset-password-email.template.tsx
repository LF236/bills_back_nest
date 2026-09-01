import { Html, Body, Container, Heading, Text, Section, Preview, Head, Img, Row, Column } from "@react-email/components";

interface ResetPasswordEmailTemplateProps {
	email: string;
	password: string;
}

export default function ResetPasswordEmailTemplate({
	email, password
}: ResetPasswordEmailTemplateProps) {
	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>Your password has been reset</Preview>
				<Container style={container}>
					<Section style={logoContainer}>
						<table
							role="presentation"
							width="100%"
							cellPadding={0}
							cellSpacing={0}
							style={{ textAlign: "center" }}
						>
							<tr>
								<td align="center">
									<table
										role="presentation"
										cellPadding={0}
										cellSpacing={0}
										style={{ margin: "0 auto" }}
									>
										<tr>
											<td style={{ verticalAlign: "middle", paddingRight: "10px" }}>
												<Img
													src="https://file.garden/aNa8POjYu0nxNoUR/tigre.png"
													width="75"
													height="75"
													alt="LF236"
												/>
											</td>
											<td style={{ verticalAlign: "middle" }}>
												<Text
													style={{
														fontSize: "14px",
														lineHeight: "1.2",
														margin: 0,
													}}
												>
													LF236 - Full Stack Developer
												</Text>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</Section>

					<Heading style={h1}>Your password has been reset</Heading>

					<Text style={heroText}>
						We've generated a new temporary password for your account.
					</Text>

					<Text style={text}>
						Account: <strong>{email}</strong>
					</Text>

					<Section style={passwordBox}>
						<Text style={passwordLabel}>Your new temporary password</Text>
						<Text style={passwordText}>{password}</Text>
					</Section>

					<Section style={warningBox}>
						<Text style={warningText}>
							⚠️ For security reasons, please log in and change this password immediately.
						</Text>
					</Section>

					<Text style={text}>
						If you didn't request a password reset, please contact support immediately as your account may be compromised.
					</Text>

					<Section>
						<Text style={footerText}>
							©2025 LF236 - Full Stack Developer. <br />
							Mexico <br />
							<br />
							All rights reserved.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}


const main = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
	margin: '0 auto',
	padding: '0px 20px',
};

const logoContainer = {
	marginTop: '32px',
};

const h1 = {
	color: '#1d1c1d',
	fontSize: '36px',
	fontWeight: '700',
	margin: '30px 0',
	padding: '0',
	lineHeight: '42px',
};

const heroText = {
	fontSize: '20px',
	lineHeight: '28px',
	marginBottom: '30px',
};

const passwordBox = {
	background: '#1d1c1d',
	borderRadius: '8px',
	marginBottom: '24px',
	padding: '32px 24px',
	textAlign: 'center' as const,
};

const passwordLabel = {
	color: '#a0a0a0',
	fontSize: '12px',
	letterSpacing: '1px',
	textTransform: 'uppercase' as const,
	margin: '0 0 12px 0',
};

const passwordText = {
	color: '#ffffff',
	fontSize: '28px',
	fontWeight: '700',
	letterSpacing: '4px',
	margin: '0',
	fontFamily: "'Courier New', Courier, monospace",
};

const warningBox = {
	background: '#fff8e1',
	borderLeft: '4px solid #f59e0b',
	borderRadius: '4px',
	marginBottom: '24px',
	padding: '16px 20px',
};

const warningText = {
	color: '#92400e',
	fontSize: '14px',
	lineHeight: '20px',
	margin: '0',
};

const text = {
	color: '#000',
	fontSize: '14px',
	lineHeight: '24px',
};

const footerText = {
	fontSize: '12px',
	color: '#b7b7b7',
	lineHeight: '15px',
	textAlign: 'left' as const,
	marginBottom: '50px',
};
