const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Employee API', () => {
    describe('Get Employee Information', () => {
        it('should GET employee information with valid token', (done) => {
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
                    const new_password = {
                        password: 'test',
                    };
                    chai
                        .request('http://localhost:3001')
                        .get('/api/employee/me')
                        .set(headers)
                        .send()
                        .end((err, resp) => {
                            expect(resp.body[0].first_name).to.eql('test');
                            expect(resp.body[0].last_name).to.eql("user");
                            expect(resp.body[0].username).to.eql("test");
                            expect(resp.body[0].home_address).to.eql("12345 Test Street");
                            done();
                        });
                });
        });

        it('should not GET employee information with invalid token', (done) => {
            const expected = { msg: 'Invalid Token' };
            const testUser = {
                username: 'test',
                password: 'test',
            };

            const headers = {
                Authorization: 'Bearer 1254125125',
            }
            chai
                .request('http://localhost:3001')
                .get('/api/employee/me')
                .set(headers)
                .send()
                .end((err, resp) => {
                    expect(resp.body).to.eql(expected)
                    done();
                });
        });
    });
    describe('Update Employee Information', () => {
        it('should PUT employee information with valid token and fields', (done) => {
            const testUser = {
                username: 'test',
                password: 'test',
            };

            const expected = { msg: "Successfully Updated user." };

            chai.request('http://localhost:3001')
                .post('/api/auth/login')
                .send(testUser)
                .end((err, resp) => {
                    const token = resp.body.access_token;
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };
                    const updated_information = {
                        first_name: 'test',
                        last_name: 'user',
                        username: 'test',
                        home_address: '12345 Test Street',
                    };
                    chai
                        .request('http://localhost:3001')
                        .put('/api/employee/me/update')
                        .set(headers)
                        .send(updated_information)
                        .end((err, resp) => {
                            expect(resp.body).to.eql(expected);
                            done();
                        });
                });
        });
        it('should not PUT employee information with valid token and invalid fields', (done) => {
            const testUser = {
                username: 'test',
                password: 'test',
            };

            const expected = { msg: "Must update at least one value" };

            chai.request('http://localhost:3001')
                .post('/api/auth/login')
                .send(testUser)
                .end((err, resp) => {
                    const token = resp.body.access_token;
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };
                    chai
                        .request('http://localhost:3001')
                        .put('/api/employee/me/update')
                        .set(headers)
                        .send()
                        .end((err, resp) => {
                            expect(resp.body).to.eql(expected);
                            done();
                        });
                });
        });

        it('should not PUT employee information with invalid token and valid fields', (done) => {
            const testUser = {
                username: 'test',
                password: 'test',
            };

            const headers = {
                Authorization: 'Bearer 12412412',
            };

            const expected = { msg: "Invalid Token" };

            chai
                .request('http://localhost:3001')
                .put('/api/employee/me/update')
                .set(headers)
                .send()
                .end((err, resp) => {
                    expect(resp.body).to.eql(expected);
                    done();
                });
        });
    });
});


