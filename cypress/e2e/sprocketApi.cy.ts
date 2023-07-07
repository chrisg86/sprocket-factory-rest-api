describe('Sprocket API', () => {
  const baseUrl = 'http://localhost:8000/api/v1';
  const createUrl = `${baseUrl}/sprockets`;
  const detailUrl = (id: string | number) => `${baseUrl}/sprockets/${id}`;

  describe('Create endpoint', () => {
    it('fails when we send an empty request body', () => {
      cy.request({
        method: 'POST',
        url: createUrl,
        body: {},
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(400);

        expect(response.body).to.deep.include({
          error: {
            validation: [
              '"teeth" is required',
              '"pitch_diameter" is required',
              '"outside_diameter" is required',
              '"pitch" is required',
            ],
          },
        });
      });
    });

    it('fails when we send an partial request body', () => {
      cy.request({
        method: 'POST',
        url: createUrl,
        body: { teeth: 4, pitch_diameter: 2 },
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(400);

        expect(response.body).to.deep.include({
          error: {
            validation: ['"outside_diameter" is required', '"pitch" is required'],
          },
        });
      });
    });

    it('fails when we send an unknown request body field', () => {
      cy.request({
        method: 'POST',
        url: createUrl,
        body: { teeth: 4, pitch_diameter: 2, outside_diameter: 4, pitch: 6, a: 1 },
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(400);
        console.log(JSON.stringify(response.body));

        expect(response.body).to.deep.include({ error: { validation: ['"a" is not allowed'] } });
      });
    });

    it('succeeds when we send correct request body', () => {
      const data = { teeth: 4, pitch_diameter: 2, outside_diameter: 4, pitch: 6 };
      cy.request({
        method: 'POST',
        url: createUrl,
        body: data,
      }).should((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.include(data);
      });
    });
  });

  describe('Get detail endpoint', () => {
    it('succeeds when a valid id is given', () => {
      const data = { teeth: 4, pitch_diameter: 2, outside_diameter: 4, pitch: 6 };

      cy.request({
        method: 'POST',
        url: createUrl,
        body: data,
      })
        .its('body')
        .as('sprocket')
        .then(function () {
          cy.request({
            method: 'GET',
            url: detailUrl(this.sprocket.id),
          }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include(data);
          });
        });
    });

    it('fails when an unknown id is given', () => {
      cy.request({
        method: 'GET',
        url: detailUrl(99999),
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('fails when an invalid id is given', () => {
      cy.request({
        method: 'GET',
        url: detailUrl('abc'),
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.deep.include({
          error: {
            message: 'Invalid sprocket id',
          },
        });
      });
    });
  });

  describe('Update endpoints', () => {
    const data = { teeth: 4, pitch_diameter: 2, outside_diameter: 4, pitch: 6 };
    const updatedData = { teeth: 6, pitch_diameter: 3, outside_diameter: 6, pitch: 6 };
    const updatedPartialData = { teeth: 8, pitch: 1 };

    describe('Complete update', () => {
      it('succees when a valid id is given', () => {
        cy.request({
          method: 'POST',
          url: createUrl,
          body: data,
        })
          .its('body')
          .as('sprocket')
          .then(function () {
            cy.request({
              method: 'PUT',
              url: detailUrl(this.sprocket.id),
              body: updatedData,
            }).should((response) => {
              expect(response.status).to.eq(200);
              expect(response.body).to.deep.include(updatedData);
            });
          });
      });

      it('fails when an unknown id is given', () => {
        cy.request({
          method: 'PUT',
          url: detailUrl(99999),
          body: updatedData,
          failOnStatusCode: false,
        }).should((response) => {
          expect(response.status).to.eq(404);
        });
      });

      it('fails when an invalid id is given', () => {
        cy.request({
          method: 'PUT',
          url: detailUrl('abc'),
          body: updatedData,
          failOnStatusCode: false,
        }).should((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.deep.include({
            error: {
              message: 'Invalid sprocket id',
            },
          });
        });
      });
    });

    describe('Partial update', () => {
      it('succees when a valid id is given', () => {
        cy.request({
          method: 'POST',
          url: createUrl,
          body: data,
        })
          .its('body')
          .as('sprocket')
          .then(function () {
            cy.request({
              method: 'PATCH',
              url: detailUrl(this.sprocket.id),
              body: updatedPartialData,
            }).should((response) => {
              expect(response.status).to.eq(200);
              expect(response.body).to.deep.include({
                ...data,
                ...updatedPartialData,
              });
            });
          });
      });

      it('fails when an unknown id is given', () => {
        cy.request({
          method: 'PUT',
          url: detailUrl(99999),
          body: updatedData,
          failOnStatusCode: false,
        }).should((response) => {
          expect(response.status).to.eq(404);
        });
      });

      it('fails when an invalid id is given', () => {
        cy.request({
          method: 'PUT',
          url: detailUrl('abc'),
          body: updatedData,
          failOnStatusCode: false,
        }).should((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.deep.include({
            error: {
              message: 'Invalid sprocket id',
            },
          });
        });
      });
    });
  });
});
