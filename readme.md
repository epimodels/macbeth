# Project Macbeth

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostGRESQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Environment Setup Instructions

### Django Backend Environment
We highly recommend running Macbeth's backend from a python virtual environment (venv). To set up a virtual environment, navigate to the repo directory and execute the following command:
```bash
py -m venv .venv
```

then select the virtual environment using one of the following:

For Windows:
```
./venv/Scripts/activate.bat
```
For Mac/Linux
```bash
# arguments for run-backend.sh:
# dropdb, creatdb, dropandrun, test, or nothing to run
./scripts/run-backend.sh
# In a new terminal instance
./scripts/run-frontend.sh
```

Once the virtual environment is loaded, you'll need to install the project dependencies. Run the following:
```python
pip install -r requirements.txt
```
---
### React Frontend Environment

Installing the frontend of Macbeth requires npm. npm is included in the installation node.js, but node is not used in the project.

To install the frontend, from the project repository, run the following commands:
```bash
cd macbeth_frontend
npm install
```
---
## Running Macbeth
Project Macbeth is broken into two parts, the frontend and the backend, each are running as a distinct program. The backend must be running for the frontend to function.

Scripts for Windows and Linux/MacOS are provided to start both parts. From the project repository, run one of the following:

For Windows
```
scripts/startup.bat
```

For Linux
```bash
./scripts/run-backend.sh
./scripts/run-frontend.sh
```
---
## Contribution
Project Macbeth is an open source project and is constantly evolving to support new models. If you are interested in contributing to the project, please be sure to read over the [Contributors](#) guide and the [Code of Conduct](#).

---
## Security

Please see the [Security Guide](#) for how to report security issues.

