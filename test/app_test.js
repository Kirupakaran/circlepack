require('dotenv').config();
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../src/app');

before(function() {
    app.listen(9999, () => console.log(`App listening on port 9999!`));
});

describe('Test cases for /shipments', function () {
    describe('POST /config/upload', function () {
        it('responds with json', function (done) {
            request(app)
                .post('/config/upload')
                .attach('file', 'test/test.json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /shipments/upload', function () {
        it('responds with json', function (done) {
            request(app)
                .post('/shipments/upload')
                .attach('file', 'test/test.csv')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /shipments return data', function () {
        it('responds with json', function (done) {
            request(app)
                .get('/shipments')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.children.length).to.be.greaterThan(0);
                    done();
                });
        });
    });
});

after(function() {
    process.exit(0);
});