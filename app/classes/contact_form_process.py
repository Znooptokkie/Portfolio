from flask import current_app, flash
from flask_mail import Message
from markupsafe import escape

class ContactFormProcessing:

    @classmethod
    def process_form_data(cls, form):
        # Hidden field. Alleen bots vullen dit in!
        if form.honeypot.data:
            flash("Spam detectie: formulier niet verzonden", "danger")
            return

        # Sanitization van alle invoer
        name_safe = escape(form.name.data.strip())
        email_safe = escape(form.email.data.strip())
        message_safe = escape(form.message.data.strip())

        try:
            mail = current_app.extensions["mail"]

            msg = Message(
                subject=f"Nieuw contactbericht van {name_safe}",
                sender=current_app.config["MAIL_USERNAME"],
                recipients=[current_app.config["MAIL_USERNAME"]],
                body=(
                    f"Naam: {name_safe}\n"
                    f"Email: {email_safe}\n\n"
                    f"Bericht:\n{message_safe}"
                )
            )

            mail.send(msg)
            flash("Je bericht is verzonden!", "success")

        except Exception as e:
            current_app.logger.error(f"Mail error: {e}")
            flash("Er ging iets mis met het verzenden. Probeer later opnieuw.", "danger")
