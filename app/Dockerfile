FROM python:3.11.0
EXPOSE 8000
WORKDIR /app 

ENV PYTHONFAULTHANDLER 1
ENV PYTHONUNBUFFERED 1
RUN pip install --upgrade pip
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
	
RUN apt-get update && apt-get upgrade -y && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    node --version



RUN pip3 install poetry
ENV PATH="/home/app/.local/bin:${PATH}"

COPY pyproject.toml /app


RUN poetry config virtualenvs.create false
RUN poetry install --no-dev --no-interaction --no-ansi


RUN npm install --global yarn
COPY package.json /app
RUN yarn install

COPY . /app 

COPY ./entrypoint.sh /
RUN chmod a+x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]