import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          Store: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              userId: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
              contactData: { $ref: "#/components/schemas/ContactData" }
            }
          },
          ContactData: {
            type: "object",
            properties: {
              phone: { type: "string" },
              email: { type: "string" },
              storeHours: { type: "string" },
              aboutUs: { type: "string" },
              country: { type: "string" },
              state: { type: "string" },
              address: { type: "string" },
              number: { type: "string" },
              facebook: { type: "string" },
              instagram: { type: "string" },
              mercadoLibre: { type: "string" }
            }
          },
          User: {
            type: "object",
            properties: {
              id: { type: "string" },
              clerkId: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              phone: { type: "string" },
              address: { $ref: "#/components/schemas/Address" },
              orders: {
                type: "array",
                items: { $ref: "#/components/schemas/Order" }
              },
              isBanned: { type: "boolean" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          Address: {
            type: "object",
            properties: {
              id: { type: "string" },
              userId: { type: "string" },
              country: { type: "string" },
              state: { type: "string" },
              address: { type: "string" },
              zipCode: { type: "string" },
              number: { type: "string" }
            }
          },
          Billboard: {
            type: "object",
            properties: {
              id: { type: "string" },
              storeId: { type: "string" },
              label: { type: "string" },
              imageUrl: { type: "string" },
              categories: {
                type: "array",
                items: { $ref: "#/components/schemas/Category" }
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          Category: {
            type: "object",
            properties: {
              id: { type: "string" },
              storeId: { type: "string" },
              billboardId: { type: "string" },
              products: {
                type: "array",
                items: { $ref: "#/components/schemas/Product" }
              },
              name: { type: "string" },
              image: { type: "string" },
              promoImages: {
                type: "array",
                items: { $ref: "#/components/schemas/PromoImage" }
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          Product: {
            type: "object",
            properties: {
              id: { type: "string" },
              storeId: { type: "string" },
              categoryId: { type: "string" },
              name: { type: "string" },
              price: { type: "number", format: "decimal" },
              brandId: { type: "string" },
              orderItems: {
                type: "array",
                items: { $ref: "#/components/schemas/OrderItem" }
              },
              isFeatured: { type: "boolean" },
              isArchived: { type: "boolean" },
              productDescription: { $ref: "#/components/schemas/ProductDescription" },
              stock: { $ref: "#/components/schemas/Stock" },
              colors: {
                type: "array",
                items: { $ref: "#/components/schemas/Color" }
              },
              images: {
                type: "array",
                items: { $ref: "#/components/schemas/Image" }
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          Order: {
            type: "object",
            properties: {
              id: { type: "string" },
              storeId: { type: "string" },
              userId: { type: "string" },
              orderItems: {
                type: "array",
                items: { $ref: "#/components/schemas/OrderItem" }
              },
              isPaid: { type: "boolean" },
              phone: { type: "string" },
              address: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          OrderItem: {
            type: "object",
            properties: {
              id: { type: "string" },
              orderId: { type: "string" },
              productId: { type: "string" }
            }
          },
          ProductDescription: {
            type: "object",
            properties: {
              id: { type: "string" },
              productId: { type: "string" },
              generalDescription: { type: "string" },
              caracteristics: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          Stock: {
            type: "object",
            properties: {
              id: { type: "string" },
              productId: { type: "string" },
              quantity: { type: "integer" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          Color: {
            type: "object",
            properties: {
              id: { type: "string" },
              productId: { type: "string" },
              value: { type: "string" },
              stock: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          Image: {
            type: "object",
            properties: {
              id: { type: "string" },
              productId: { type: "string" },
              url: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          PromoImage: {
            type: "object",
            properties: {
              id: { type: "string" },
              productId: { type: "string" },
              categoryId: { type: "string" },
              url: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
        }
      },
      security: [{ BearerAuth: [] }],
      paths: {
        "/stores": {
          get: {
            summary: "Ver Las tiendas",
            description: "ver las tiendas",
            responses: {
              "200": {
                description: "tiendas",
                
                
              }}
          },
          post: {
            summary: "Crear una nueva tienda",
            description: "Crea una nueva tienda",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        example: "Nombre de la tienda"
                      }
                    },
                    required: ["name"]
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Tienda creada exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Store"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          }
        },
        "/store/{storeId}": {
          patch: {
            summary: "Actualizar una tienda",
            description: "Actualiza los detalles de una tienda específica",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        example: "Nombre actualizado de la tienda"
                      },
                      phone: {
                        type: "string",
                        example: "123456789"
                      },
                      email: {
                        type: "string",
                        example: "store@example.com"
                      },
                      country: {
                        type: "string",
                        example: "País"
                      },
                      state: {
                        type: "string",
                        example: "Estado"
                      },
                      address: {
                        type: "string",
                        example: "Dirección"
                      },
                      number: {
                        type: "string",
                        example: "Número"
                      },
                      storeHours: {
                        type: "string",
                        example: "Horario de la tienda"
                      },
                      aboutUs: {
                        type: "string",
                        example: "Información sobre la tienda"
                      },
                      facebook: {
                        type: "string",
                        example: "facebook.com/tienda"
                      },
                      instagram: {
                        type: "string",
                        example: "instagram.com/tienda"
                      },
                      mercadoLibre: {
                        type: "string",
                        example: "mercadolibre.com/tienda"
                      }
                    },
                    required: ["name"]
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Tienda actualizada exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Store"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          },
          delete: {
            summary: "Eliminar una tienda",
            description: "Elimina una tienda específica",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "Tienda eliminada exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Store"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          }
        },
        "/billboard": {
          post: {
            summary: "Crear un nuevo billboard",
            description: "Crea un nuevo billboard para una tienda específica",
            security: [{ BearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      label: {
                        type: "string",
                        example: "Promo de verano"
                      },
                      imageUrl: {
                        type: "string",
                        example: "http://example.com/image.jpg"
                      }
                    },
                    required: ["label", "imageUrl"]
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Billboard creado exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Billboard"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "403": {
                description: "Acceso prohibido"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          },
          get: {
            summary: "Obtener billboards",
            description: "Obtiene todos los billboards",
            security: [{ BearerAuth: [] }],
            responses: {
              "200": {
                description: "Lista de billboards",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Billboard"
                      }
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          }
        },
        "/billboard/{billboardId}": {
          get: {
            summary: "Obtener un billboard",
            description: "Obtiene un billboard específico por ID",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "billboardId",
                in: "path",
                required: true,
                description: "ID del billboard",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "Billboard obtenido exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Billboard"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          },
          patch: {
            summary: "Actualizar un billboard",
            description: "Actualiza un billboard específico por ID",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              },
              {
                name: "billboardId",
                in: "path",
                required: true,
                description: "ID del billboard",
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      label: {
                        type: "string",
                        example: "Promo actualizada"
                      },
                      imageUrl: {
                        type: "string",
                        example: "http://example.com/newimage.jpg"
                      }
                    },
                    required: ["label", "imageUrl"]
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Billboard actualizado exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Billboard"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "403": {
                description: "Acceso prohibido"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          },
          delete: {
            summary: "Eliminar un billboard",
            description: "Elimina un billboard específico por ID",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              },
              {
                name: "billboardId",
                in: "path",
                required: true,
                description: "ID del billboard",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "Billboard eliminado exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Billboard"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "403": {
                description: "Acceso prohibido"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          }
        },
        "/brand/{storeId}": {
          post: {
            summary: "Crear una nueva marca",
            description: "Crea una nueva marca para una tienda específica",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        example: "Nueva Marca"
                      }
                    },
                    required: ["name"]
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Marca creada exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Brand"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "403": {
                description: "Acceso prohibido"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          },
          get: {
            summary: "Obtener marcas",
            description: "Obtiene todas las marcas para una tienda específica",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "Lista de marcas",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Brand"
                      }
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          }
        },
        "/brand/{storeId}/{brandId}": {
          get: {
            summary: "Obtener una marca",
            description: "Obtiene una marca específica por ID",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              },
              {
                name: "brandId",
                in: "path",
                required: true,
                description: "ID de la marca",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "Marca obtenida exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Brand"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          },
          patch: {
            summary: "Actualizar una marca",
            description: "Actualiza una marca específica por ID",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              },
              {
                name: "brandId",
                in: "path",
                required: true,
                description: "ID de la marca",
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        example: "Marca Actualizada"
                      }
                    },
                    required: ["name"]
                  }
                }
              }
            },
            responses: {
              "200": {
                description: "Marca actualizada exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Brand"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "403": {
                description: "Acceso prohibido"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          },
          delete: {
            summary: "Eliminar una marca",
            description: "Elimina una marca específica por ID",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "storeId",
                in: "path",
                required: true,
                description: "ID de la tienda",
                schema: {
                  type: "string"
                }
              },
              {
                name: "brandId",
                in: "path",
                required: true,
                description: "ID de la marca",
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "Marca eliminada exitosamente",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Brand"
                    }
                  }
                }
              },
              "400": {
                description: "Solicitud incorrecta"
              },
              "401": {
                description: "No autorizado"
              },
              "403": {
                description: "Acceso prohibido"
              },
              "500": {
                description: "Error interno del servidor"
              }
            }
          }
        }
      },

    },
  });
  return spec;
};