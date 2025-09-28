from flask import current_app, flash
from flask_mail import Message

class ContactFormProcessing:

    @classmethod
    def process_form_data(cls, form):
        # Hidden field. Alleen bots vullen dit in!
        if form.honeypot.data:
            flash("Spam detectie: formulier niet verzonden", "danger")
            return

        try:
            mail = current_app.extensions["mail"]

            msg = Message(
                subject=f"Nieuw contactbericht van {form.name.data.strip()}",
                sender=current_app.config["MAIL_USERNAME"],
                recipients=[current_app.config["MAIL_USERNAME"]],
                body=(
                    f"Naam: {form.name.data.strip()}\n"
                    f"Email: {form.email.data.strip()}\n\n"
                    f"Bericht:\n{form.message.data.strip()}"
                )
            )

            mail.send(msg)
            flash("Je bericht is verzonden!", "success")

        except Exception as e:
            current_app.logger.error(f"Mail error: {e}")
            flash("Er ging iets mis met het verzenden. Probeer later opnieuw.", "danger")
