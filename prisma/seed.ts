import { PrismaClient } from "@prisma/client";
import type * as ModelType from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  // Seed buyers
  const buyers: ModelType.Buyer[] = await Promise.all(
    Array.from({ length: 500 }, () =>
      prisma.buyer.create({
        data: {
          fullName: faker.person.fullName(),
          contactNo: faker.phone.number(),
          email: faker.internet.email(),
          createdAt: faker.date.between({ from: "2023-01-01", to: new Date() }),
          isLoggedIn: faker.datatype.boolean(0.25),
        },
      })
    )
  );

  // Seed merchants
  const merchants: ModelType.Merchant[] = await Promise.all(
    Array.from({ length: 100 }, () =>
      prisma.merchant.create({
        data: {
          name: faker.company.name(),
          contactNo: faker.phone.number(),
          email: faker.internet.email(),
          createdAt: faker.date.between({ from: "2023-01-01", to: new Date() }),
        },
      })
    )
  );

  // Seed addresses for buyers
  await Promise.all(
    buyers.map((buyer) =>
      prisma.address.create({
        data: {
          firstLine: faker.location.streetAddress(true),
          secondLine: faker.location.city(),
          postcode: faker.location.zipCode("#####"),
          state: faker.helpers.arrayElement([
            "Johor",
            "Kedah",
            "Kelantan",
            "KualaLumpur",
            "Labuan",
            "Melaka",
            "NegeriSembilan",
            "Pahang",
            "Penang",
            "Perak",
            "Perlis",
            "Putrajaya",
            "Sabah",
            "Sarawak",
            "Selangor",
            "Terengganu",
          ]),
          buyerId: buyer.id,
          createdAt: buyer.createdAt,
        },
      })
    )
  );

  // Seed addresses for merchants
  const merchantAddresses: ModelType.Address[] = await Promise.all(
    merchants.map((merchant) =>
      prisma.address.create({
        data: {
          firstLine: faker.location.streetAddress(true),
          secondLine: faker.location.city(),
          postcode: faker.location.zipCode("#####"),
          state: faker.helpers.arrayElement([
            "Johor",
            "Kedah",
            "Kelantan",
            "KualaLumpur",
            "Labuan",
            "Melaka",
            "NegeriSembilan",
            "Pahang",
            "Penang",
            "Perak",
            "Perlis",
            "Putrajaya",
            "Sabah",
            "Sarawak",
            "Selangor",
            "Terengganu",
          ]),
          merchantId: merchant.id,
          createdAt: merchant.createdAt,
        },
      })
    )
  );

  // Seed products
  const products: ModelType.Product[] = await Promise.all(
    merchants.flatMap((merchant) =>
      Array.from({ length: 10 }, () =>
        prisma.product.create({
          data: {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            unit: faker.helpers.arrayElement(["pcs", "kg", "box", "litre"]),
            image: faker.image.urlLoremFlickr({
              category: "cats",
              width: 128,
            }),
            availability: faker.datatype.boolean(),
            brand: faker.company.name(),
            category: faker.helpers.arrayElement([
              "Electronics",
              "Fashion",
              "Groceries",
              "Health",
              "Home",
              "Sports",
              "Toys",
              "Vehicles",
              "Books",
            ]),
            rating: faker.number.float({ min: 0, max: 5, fractionDigits: 2 }),
            merchantId: merchant.id,
            createdAt: merchant.createdAt,
          },
        })
      )
    )
  );

  let refundCount = 0;

  for (let i = 1; i <= 1000; i++) {
    const buyer: ModelType.Buyer = faker.helpers.arrayElement(buyers);
    const merchant: ModelType.Merchant = faker.helpers.arrayElement(merchants);
    const id: string = `RSQ${i.toString().padStart(4, "0")}`;
    const address: ModelType.Address | undefined = merchantAddresses.find(
      (address) => merchant.id === address.merchantId
    );

    if (!address) {
      console.log("error");
    }

    const createdAt: Date = faker.date.between({
      from:
        buyer.createdAt > merchant.createdAt
          ? buyer.createdAt
          : merchant.createdAt,
      to: new Date(),
    });

    const oneMonthAgo: Date = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const twoMonthsAgo: Date = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const pickupTime: Date = new Date(createdAt);
    pickupTime.setDate(createdAt.getDate() + 5);

    const status: ModelType.OrderStatus =
      createdAt >= oneMonthAgo
        ? faker.helpers.arrayElement([
            "Pending",
            "Preparing",
            "WaitingForPickup",
            "WaitingToRefund",
            "Completed",
          ])
        : createdAt >= twoMonthsAgo
        ? faker.helpers.arrayElement(
            refundCount <= 150
              ? ["Completed", "Refunded", "DidNotPickup"]
              : ["Completed", "DidNotPickup"]
          )
        : faker.helpers.arrayElement(
            refundCount <= 150 ? ["Completed", "Refunded"] : ["Completed"]
          );

    if (status === "Refunded") {
      refundCount++;
    }

    const order: ModelType.Order = await prisma.order.create({
      data: {
        id: id,
        status: status,
        addressId: address ? address.id : 0,
        pickupTime: pickupTime,
        buyerId: buyer.id,
        merchantId: merchant.id,
        createdAt: createdAt,
      },
    });

    const selectedProducts: ModelType.Product[] = [
      ...products.filter((product) => product.merchantId === merchant.id),
    ]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 5 + 1));

    const items: ModelType.OrderItem[] = await Promise.all(
      selectedProducts.map((product) =>
        prisma.orderItem.create({
          data: {
            quantity: Math.floor(Math.random() * 3) + 1,
            productId: product.id,
            orderId: order.id,
            createdAt: createdAt,
          },
        })
      )
    );

    let subTotal: number = 0;

    items.forEach((item) => {
      const product: ModelType.Product | undefined = selectedProducts.find(
        (product) => product.id === item.productId
      );

      if (product) {
        subTotal += item.quantity * product.price;
      } else {
        console.log("error");
      }
    });

    const voucherPercent: number = faker.helpers.arrayElement([
      0, 5, 10, 15, 20,
    ]);

    const voucherApplied: number = subTotal * (voucherPercent / 100);

    const serviceTax: number = (subTotal - voucherApplied) * 0.1;

    const totalPayment: number = subTotal - voucherApplied + serviceTax;

    await prisma.transaction.create({
      data: {
        subTotal: subTotal,
        serviceTax: serviceTax,
        voucherPercent: voucherPercent,
        voucherApplied: voucherApplied,
        totalPayment: totalPayment,
        paymentMethod: faker.helpers.arrayElement([
          "FPX",
          "CreditCard",
          "DebitCard",
          "PayPal",
          "CashOnDelivery",
        ]),
        orderId: order.id,
        createdAt: createdAt,
      },
    });
  }

  console.log("Database seeded successfully.");
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
