import { Html, Body, Container, Heading, Text, Button } from "@react-email/components";

interface ValidateEmailTemplateProps {
    email: string;
    link: string;
}

export default function ValidateEmailTemplate({ email, link }: ValidateEmailTemplateProps) {
    return (
        <Html>
            <Body style={{ backgroundColor: '#f3f3f3' }}>
                <Container style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
                    <Heading>¡Hola {email} 🎉!</Heading>
                    <Text>Gracias por registrarte en nuestra plataforma.</Text>
                    <Button href={link}>Activar cuenta</Button>
                </Container>
            </Body>
        </Html>
    )
}