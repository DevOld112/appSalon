import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    //Enviar Email
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: email,
        subject: 'AppSalon - Confirma tu Cuenta',
        text: 'AppSalon - Confirma tu Cuenta',
        html: `
        <html>
            <head>
                <style>
                /* Agrega estilos CSS aquí */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #555;
                }
                a {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                a:hover {
                    background-color: #0056b3;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <h1>Hola ${name},</h1>
                <p>¡Bienvenido a AppSalon!</p>
                <p>Tu cuenta está casi lista, solo debes confirmarla en el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
                <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
                </div>
            </body>
            </html>
        `
    })

    console.log('Mensaje Enviado', info.messageId)
}

export async function sendEmailPasswordReset({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    //Enviar Email
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: email,
        subject: 'AppSalon - Restablece tu contraseña',
        text: 'AppSalon - Restablece tu contraseña',
        html: `
        <html>
            <head>
                <style>
                /* Agrega estilos CSS aquí */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #555;
                }
                a {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                a:hover {
                    background-color: #0056b3;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <h1>Hola ${name},</h1>
                <p>¡Restablece tu Password con la siguiente instruccion!</p>
                <p>Simplemente debes ir a este enlace para que pueda volver a restaurar tu contraseña:</p>
                <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Restablecer mi contraseña</a>
                <p>Si no solicitaste recuperar tu contraseña, puedes ignorar este mensaje.</p>
                </div>
            </body>
            </html>
        `
    })

    console.log('Mensaje Enviado', info.messageId)
}


