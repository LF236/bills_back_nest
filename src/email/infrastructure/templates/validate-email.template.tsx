import { Html, Body, Container, Heading, Text, Link, Section, Preview, Head, Img, Row, Column } from "@react-email/components";

interface ValidateEmailTemplateProps {
    email: string;
    link: string;
}

export default function ValidateEmailTemplate({
    email, link
}: ValidateEmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>Confirm your email address</Preview>
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
                                                    alt="Slack"
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
                    <Heading style={h1}>Confirm your email address</Heading>
                    <Text style={heroText}>
                        Your confirmation link is below - enter or click the link to confirm
                        your email address.
                    </Text>

                    <Text style={text}>
                        This link is only valid for the email address: <strong>{email}</strong>
                    </Text>

                    <Text>
                        Just have 15 minutes to confirm your email address, or the link will expire.
                    </Text>

                    <Section style={codeBox}>
                        <Link href={link} target="_blank" rel="noopener noreferrer">Click here to validate your email</Link>
                    </Section>

                    <Text style={text}>
                        If you didn't request this email, there's nothing to worry about, you
                        can safely ignore it.
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


const footerText = {
    fontSize: '12px',
    color: '#b7b7b7',
    lineHeight: '15px',
    textAlign: 'left' as const,
    marginBottom: '50px',
};

const footerLink = {
    color: '#b7b7b7',
    textDecoration: 'underline',
};

const footerLogos = {
    marginBottom: '32px',
    paddingLeft: '8px',
    paddingRight: '8px',
};

const socialMediaIcon = {
    display: 'inline',
    marginLeft: '8px',
};

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

const codeBox = {
    background: 'rgb(245, 244, 245)',
    borderRadius: '4px',
    marginBottom: '30px',
    padding: '40px 10px',
};

const confirmationCodeText = {
    fontSize: '30px',
    textAlign: 'center' as const,
    verticalAlign: 'middle',
};

const text = {
    color: '#000',
    fontSize: '14px',
    lineHeight: '24px',
};