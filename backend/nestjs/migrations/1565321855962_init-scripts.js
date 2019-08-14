exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('stored_file', {
        id: { type: 'varchar(255)', notNull: true, primaryKey: true },
        meta_data: { type: 'jsonb', notNull: false },
        status: { type: 'varchar(255)', notNull: true },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
    pgm.createFunction('set_updated_at', [], {
        returns: 'TRIGGER',
        language: 'plpgsql'
    },
    `
    BEGIN
        new.updated_at := CURRENT_TIMESTAMP;
        RETURN new;
    END;
    `
    );
    pgm.createTrigger('stored_file', 'stored_file_updated_at', {
        when: 'before',
        operation: 'update',
        level: 'row',
        language: 'plpgsql',
        function: 'set_updated_at'
    });
};

exports.down = (pgm) => {

};
