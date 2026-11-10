from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME = "tu_correo@gmail.com",
    MAIL_PASSWORD = "tu_contraseña_app",
    MAIL_FROM = "tu_correo@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_TLS = True,
    MAIL_SSL = False,
    USE_CREDENTIALS = True
)

@app.post("/formulario") # type: ignore
async def recibir_mensaje(mensaje: Mensaje): # type: ignore
    # ... (guardar en DB y JSON)

    # Enviar correo
    email = MessageSchema(
        subject="Nueva consulta recibida",
        recipients=["los.tilines.barberos@gmail.com"],  # ← AQUÍ pones el correo al que quieres que llegue
        body=f"""
        Nombre: {mensaje.nombre}
        Teléfono: {mensaje.telefono}
        Correo: {mensaje.correo}
        Pregunta: {mensaje.pregunta}
        """,
        subtype="plain"
    )
    fm = FastMail(conf)
    await fm.send_message(email)

    return {"estado": "recibido"}
