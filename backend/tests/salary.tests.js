const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Salary API', () => {
    describe('Get Salary Information', () => {
        it('should POST salary information with valid token and user', (done) => {
            const testUser = {
                username: 'test',
                password: 'test',
            };

            chai.request('http://localhost:3001')
                .post('/api/auth/login')
                .send(testUser)
                .end((err, resp) => {
                    const token = resp.body.access_token;
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    const username = {
                        username: 'test'
                    };

                    const expected = {
                        yearly_salary: 45000.5
                    }

                    chai
                        .request('http://localhost:3001')
                        .post('/api/salary/')
                        .set(headers)
                        .send(username)
                        .end((err, resp) => {
                            expect(resp.body[0]).to.contain(expected);
                            done();
                        });
                });
        });

        it('should not POST salary information with valid token and invalid user', (done) => {
            const testUser = {
                username: 'test',
                password: 'test',
            };

            chai.request('http://localhost:3001')
                .post('/api/auth/login')
                .send(testUser)
                .end((err, resp) => {
                    const token = resp.body.access_token;
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    const username = {
                        username: 'admin'
                    };

                    const expected = {
                        msg: "You are not allowed to see this information."
                    }

                    chai
                        .request('http://localhost:3001')
                        .post('/api/salary/')
                        .set(headers)
                        .send(username)
                        .end((err, resp) => {
                            expect(resp.body).to.contain(expected);
                            done();
                        });
                });
        });

        it('should POST salary information with valid super user token and view another user', (done) => {
            const testUser = {
                username: 'admin',
                password: 'admin',
            };

            chai.request('http://localhost:3001')
                .post('/api/auth/login')
                .send(testUser)
                .end((err, resp) => {
                    const token = resp.body.access_token;
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    const username = {
                        username: 'test'
                    };

                    const expected = {
                        yearly_salary: 45000.5
                    }

                    chai
                        .request('http://localhost:3001')
                        .post('/api/salary/')
                        .set(headers)
                        .send(username)
                        .end((err, resp) => {
                            expect(resp.body[0]).to.contain(expected);
                            done();
                        });
                });
        });
    });

    describe('Update Salary Information', () => {
        it('should PUT salary information with valid super user token and user', (done) => {
            const testUser = {
                username: 'admin',
                password: 'admin',
            };

            chai.request('http://localhost:3001')
                .post('/api/auth/login')
                .send(testUser)
                .end((err, resp) => {
                    const token = resp.body.access_token;
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    const username = {
                        username: 'admin',
                        yearly_salary: 50000.00
                    };

                    const expected = {
                        msg: "Salary updated successfully."
                    }

                    chai
                        .request('http://localhost:3001')
                        .put('/api/salary/update')
                        .set(headers)
                        .send(username)
                        .end((err, resp) => {
                            expect(resp.body).to.contain(expected);
                            done();
                        });
                });
        });

        it('should not PUT salary information with valid token and invalid user', (done) => {
            const testUser = {
                username: 'test',
                password: 'test',
            };

            chai.request('http://localhost:3001')
                .post('/api/auth/login')
                .send(testUser)
                .end((err, resp) => {
                    const token = resp.body.access_token;
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };

                    const username = {
                        username: 'admin',
                        yearly_salary: 50000.00
                    };

                    const expected = {
                        msg: "You are not authorized to update employee salaries."
                    }

                    chai
                        .request('http://localhost:3001')
                        .put('/api/salary/update')
                        .set(headers)
                        .send(username)
                        .end((err, resp) => {
                            expect(resp.body).to.contain(expected);
                            done();
                        });
                });
        });

    });
});