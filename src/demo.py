import sqlite3
from faker import Faker
import random
from datetime import datetime


def insert_suppliers():
    # 创建 SQLite3 数据库连接
    conn = sqlite3.connect("db.sqlite3")
    cursor = conn.cursor()

    # 创建表
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS suppliers_supplier (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(255) NOT NULL UNIQUE,
                        contact_person VARCHAR(255),
                        contact_email VARCHAR(254),
                        contact_phone VARCHAR(20),
                        user_id INTEGER REFERENCES auth_user
                    )"""
    )

    # 使用 Faker 生成测试数据并插入到数据库中
    faker = Faker()
    existing_names = set()  # 用来保存已经生成的名称
    for _ in range(100):  # 生成 100 条测试数据
        name = faker.company()
        while name in existing_names:  # 确保名称唯一
            name = faker.company()
        existing_names.add(name)

        contact_person = faker.name()
        contact_email = faker.email()
        contact_phone = faker.phone_number()
        user_id = 1  # 随机生成一个 user_id

        cursor.execute(
            """INSERT INTO suppliers_supplier (
                            name, contact_person, contact_email, contact_phone, user_id
                        ) VALUES (?, ?, ?, ?, ?)""",
            (name, contact_person, contact_email, contact_phone, user_id),
        )

    # 提交更改并关闭连接
    conn.commit()
    conn.close()

    print("测试供应商数据插入完成")


def insert_products():
    # 创建 SQLite3 数据库连接
    conn = sqlite3.connect("db.sqlite3")
    cursor = conn.cursor()

    # 创建表
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS products_product (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(255) NOT NULL,
                        description TEXT,
                        sku VARCHAR(50) UNIQUE NOT NULL,
                        image VARCHAR(255),
                        price DECIMAL,
                        discount_price DECIMAL,
                        is_discounted BOOLEAN NOT NULL,
                        is_valid BOOLEAN NOT NULL,
                        stock_quantity INTEGER UNSIGNED NOT NULL,
                        is_in_stock BOOLEAN NOT NULL,
                        created_at DATETIME NOT NULL,
                        updated_at DATETIME NOT NULL,
                        weight DECIMAL,
                        dimensions VARCHAR(50),
                        status VARCHAR(20) NOT NULL,
                        public BOOLEAN NOT NULL,
                        supplier_id BIGINT REFERENCES suppliers_supplier,
                        user_id INTEGER REFERENCES auth_user,
                        CHECK (stock_quantity >= 0)
                    )"""
    )

    # 使用 Faker 生成测试数据并插入到数据库中
    faker = Faker()
    cursor.execute("SELECT id FROM suppliers_supplier")
    supplier_ids = [row[0] for row in cursor.fetchall()]
    for _ in range(100):  # 生成 100 条测试数据
        name = faker.name()
        description = faker.text()
        sku = faker.unique.text(max_nb_chars=50)
        image = faker.image_url()
        price = round(random.uniform(10, 1000), 2)
        discount_price = round(price * random.uniform(0.5, 0.9), 2)
        is_discounted = random.choice([True, False])
        is_valid = random.choice([True, False])
        stock_quantity = random.randint(0, 1000)
        is_in_stock = random.choice([True, False])
        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        weight = round(random.uniform(0.1, 50), 2)
        dimensions = f"{random.randint(1, 100)}x{random.randint(1, 100)}x{random.randint(1, 100)}"
        status = random.choice(["active", "inactive"])
        public = random.choice([True, False])
        supplier_id = random.choice(supplier_ids)
        user_id = 1

        cursor.execute(
            """INSERT INTO products_product (
                            name, description, sku, image, price, discount_price, 
                            is_discounted, is_valid, stock_quantity, is_in_stock, 
                            created_at, updated_at, weight, dimensions, status, 
                            public, supplier_id, user_id
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                name,
                description,
                sku,
                image,
                price,
                discount_price,
                is_discounted,
                is_valid,
                stock_quantity,
                is_in_stock,
                created_at,
                updated_at,
                weight,
                dimensions,
                status,
                public,
                supplier_id,
                user_id,
            ),
        )

    # 提交更改并关闭连接
    conn.commit()
    conn.close()

    print("测试产品数据插入完成")


if __name__ == "__main__":
    # insert_suppliers()
    # insert_products()
    insert_categories()
    pass
