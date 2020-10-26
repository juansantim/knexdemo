exports.up = function (knex) {
    return knex.schema.table("telefonos_usuarios", (tbl) => {
        tbl.string("numero", 10).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("telefonos_usuarios", (tbl) => {
        tbl.dropColumn("numero");
    });
};
