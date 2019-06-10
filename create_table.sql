CREATE TABLE shipments_data(
    id SERIAL,
    shipment_id INTEGER,
    source_id VARCHAR(10),
    destination_id VARCHAR(10),
    date VARCHAR(10),
    weight INTEGER,
    cost INTEGER,
    new_shipment_id INTEGER,
    new_WEIGHT INTEGER,
    new_cost INTEGER,
    total_tls INTEGER
);