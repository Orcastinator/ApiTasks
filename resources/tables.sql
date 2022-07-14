CREATE TABLE tasks {
    id_task NUMBER AUTO_INCREMENT,
    titulo VARCHAR2(20) NOT NULL,
    descripcion VARCHAR2(150) NOT NULL,
    active NUMBER DEFAULT 0,
    done NUMBER DEFAULT 0,
    date_done DATE,

    CONSTRAINT pk_tasks PRIMARY KEY (id_task)
}