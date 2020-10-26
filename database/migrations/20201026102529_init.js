exports.up = function (knex) {
    return knex.schema
        .createTable("usuarios", (tbl) => {
            tbl.increments();

            tbl.string("email", 128).unique().notNullable().index();

            tbl.timestamps(true, true);
        })
        .createTable("medicos", (tbl) => {
            tbl.increments();

            tbl.string("cedula", 11).unique().notNullable().index();
            tbl.string("exequatur", 25);
            tbl.integer("user_id")
                .unsigned()
                .notNullable()
                .unique()
                .references("usuarios.id")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
        .createTable("telefonos_usuarios", (tbl) => {
            tbl.increments();

            tbl.string("tipo", 1).notNullable().defaultTo("M"); // M: Movil, C: Casa, O: Oficina

            tbl.integer("user_id")
                .unsigned()
                .notNullable()
                .references("usuarios.id")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("telefonos_usuarios")
        .dropTableIfExists("medicos")
        .dropTableIfExists("usuarios");
};
