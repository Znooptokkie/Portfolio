# Portfolio CV

## Inleiding

## Aantekeningen

## Migrate

- Eenmalig uitvoeren:
```bash
flask db init
```

- Init Tables:
```bash
flask db migrate -m "init tables"
```

- Upgrade database:
```bash
flask db upgrade
```

## SQLAlchemy queries

- Retrieve all projects:
```py
Project.query.all()
```

- Retrieve Primary Key
```py
Project.query.get(1)
```

- Retrieve by filter:
```py
from sqlalchemy import and_

Project.query.filter_by(year=2025).all()
Project.query.filter_by(featured=True).all()
Project.query.filter(Project.language.ilike('%Python%')).all()
Project.query.filter(and_(Project.year == 2023, Project.featured == True)).all()
```

- Sort Projects:
```py
Project.query.order_by(Project.year.desc()).all()
Project.query.order_by(Project.title.asc()).all()
```

- Limit Projects:
```py
Project.query.limit(3).all()
```

- Filter with comperison operators:
```py
Project.query.filter(Project.year < 2025).all()
Project.query.filter(Project.datetime > datetime(2025, 8, 27, 19, 59)).all()
```

- Count projects
```py
Project.query.count()
```

- Specific columns:
```py
Project.query.with_entities(Project.project_id, Project.title, Project.year).all()
```

- Pagination:
```py
Project.query.paginate(page=1, per_page=2)
```

- EXAMPLE:
```py
"""
@project_bp.route('/')
def list_projects():
    page = request.args.get('page', 1, type=int)
    year = request.args.get('year', type=int)
    query = Project.query
    if year:
        query = query.filter_by(year=year)
    return query.order_by(Project.year.desc()).paginate(page=page, per_page=3)
"""
```