const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
describe('AUTH API', () => {

  describe('New User Tests', () => {

    // run one time then skip once working
    it('should POST a new user', (done) => {
      const testEmployee = {
        username: 'test',
        password: 'test',
        first_name: 'test',
        last_name: 'user',
        home_address: '12345 Test Street',
        yearly_salary: '45000.50',
      };

      const expected = { msg: "Created new account!" };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/newEmployee')
        .send(testEmployee)
        .end((err, resp) => {
          console.log(resp.body);
          expect(resp.body).to.contain(expected);
          done();
        });
    });

    it('should not POST a new user without username', (done) => {
      const testEmployee = {
        password: 'test',
        first_name: 'test',
        last_name: 'user',
        home_address: '12345 Test Street',
        yearly_salary: '45000',
      };

      const expected = { msg: "Not all required fields were submitted." };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/newEmployee')
        .send(testEmployee)
        .end((err, resp) => {
          expect(resp.body).to.contain(expected);
          done();
        });
    });

    it('should not POST a new user without first_name', (done) => {
      const testEmployee = {
        username: 'password',
        password: 'test',
        last_name: 'user',
        home_address: '12345 Test Street',
        yearly_salary: '45000',
      };

      const expected = { msg: "Not all required fields were submitted." };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/newEmployee')
        .send(testEmployee)
        .end((err, resp) => {
          expect(resp.body).to.contain(expected);
          done();
        });
    });

    it('should not POST a new user without last_name', (done) => {
      const testEmployee = {
        username: 'password',
        password: 'test',
        first_name: 'user',
        home_address: '12345 Test Street',
        yearly_salary: '45000',
      };

      const expected = { msg: "Not all required fields were submitted." };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/newEmployee')
        .send(testEmployee)
        .end((err, resp) => {
          expect(resp.body).to.contain(expected);
          done();
        });
    });

    it('should not POST a new user without home_address', (done) => {
      const testEmployee = {
        username: 'password',
        password: 'test',
        first_name: 'user',
        last_name: 'last',
        yearly_salary: '45000',
      };

      const expected = { msg: "Not all required fields were submitted." };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/newEmployee')
        .send(testEmployee)
        .end((err, resp) => {
          expect(resp.body).to.contain(expected);
          done();
        });
    });

    it('should not POST a new user without yearly_salary', (done) => {
      const testEmployee = {
        username: 'password',
        password: 'test',
        first_name: 'user',
        last_name: 'last',
        home_address: '12345 Test Street',
      };

      const expected = { msg: "Not all required fields were submitted." };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/newEmployee')
        .send(testEmployee)
        .end((err, resp) => {
          expect(resp.body).to.contain(expected);
          done();
        });
    });

    it('should not POST a new user if they already exist', (done) => {
      const testUser = {
        username: 'test',
        password: 'test',
        first_name: 'test',
        last_name: 'user',
        home_address: '12345 Test Street',
        yearly_salary: '45000',
      };

      const expected = { msg: "Could not create employee because this username exists already" };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/newEmployee')
        .send(testUser)
        .end((err, resp) => {
          expect(resp.body).to.eql(expected);
          done();
        });
    });
  });


  describe('Login Tests', () => {

    it('should POST a login for an existing employee', (done) => {
      const testUser = {
        username: 'test',
        password: 'test',
      };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/login')
        .send(testUser)
        .end((err, resp) => {
          expect(resp.body.auth).to.be.true;
          expect(resp.body.expires_in).to.be.eql(86400);
          expect(resp.body.access_token).to.be.a('string');
          expect(resp.body.refresh_token).to.be.a('string');
          done();
        });
    });

    it('should not POST a login for a nonexistant employee', (done) => {
      const unknown_user = {
        username: 'test12515-9172510256125',
        password: 'test',
      };

      const expected = { msg: "Username does not exist." };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/login')
        .send(unknown_user)
        .end((err, resp) => {
          expect(resp.body).to.contain(expected);
          done();
        });
    });

    it('should not POST a login for invalid password', (done) => {
      const unknown_user = {
        username: 'test',
        password: 'test1251251241243',
      };

      const expected = { msg: "Invalid password" };

      chai
        .request('http://localhost:3001')
        .post('/api/auth/login')
        .send(unknown_user)
        .end((err, resp) => {
          expect(resp.body).to.contain(expected);
          done();
        });
    });
  });


  describe('Update Password Tests', () => {
    it('should not PUT a password change with invalid token', (done) => {
      const new_password = {
        password: 'test1251251241243',
      }
      const headers = {
        Authorization: 'Bearer 1254125125',
      }

      const expected = { msg: "Invalid Token" };

      chai
        .request('http://localhost:3001')
        .put('/api/auth/updatePassword')
        .set(headers)
        .send(new_password)
        .end((err, resp) => {
          expect(resp.body).to.contain(expected);
          done();
        });
    });


    it('should not PUT a password change with empty password', (done) => {
      const expected = { msg: "Please specify a valid new password." };

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
          }
          chai
            .request('http://localhost:3001')
            .put('/api/auth/updatePassword')
            .set(headers)
            .send()
            .end((err, resp) => {
              expect(resp.body).to.contain(expected);
              done();
            });
        });
    });

    it('should PUT a password change', (done) => {
      const expected = { msg: "Employee password updated successfully!" };

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
            .put('/api/auth/updatePassword')
            .set(headers)
            .send(new_password)
            .end((err, resp) => {
              expect(resp.body).to.contain(expected);
              done();
            });
        });
    });
  });
});
