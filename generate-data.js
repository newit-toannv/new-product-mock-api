const faker = require('faker');
const fs = require('fs');


//set locale to use English
faker.locale = 'en';

//random data
//random company
const randomCompanyList = (n) => {
    if (n <= 0 ) return [];
    const companyList = [];

    // loop and push company
    Array.from(new Array(n)).forEach (() => {
        const company = {
            id: faker.datatype.uuid(),
            name: faker.company.companyName(),
            type: "Product",
            employees: "1000+",
            country: faker.address.country(),
            workingDay: "Monday - Friday",
            logoUrl: faker.image.business(100,100)
        }

        companyList.push(company)
    })

    return companyList;
}

//random category
const randomCategoryList = (n) => {
    if (n <= 0) return [];
    const categoryList = [];

    // loop and push category
    Array.from(new Array(n)).forEach (() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.name.jobType(),
            numberOfJobs: faker.datatype.number(),
            iconUrl: faker.image.image(50,50)
        }

        categoryList.push(category)
    })

    return categoryList;
}

//random Job

const randomJobList = (companyList, categoryList, numberOfJobs) => {
    const jobList = [];
    if (numberOfJobs <= 0) return [];

    //random data
    for (const company of companyList) {
        Array.from(new Array(numberOfJobs)).forEach(() => {
            const job = {
                id: faker.datatype.uuid(),
                companyId: company.id,
                title: faker.name.jobTitle(),
                location: faker.address.streetAddress() + ", " + faker.address.cityName(),
                budget: "$700 - $1500",
                amount: faker.datatype.number(30),
                description: faker.lorem.sentences(),
                requirements: faker.lorem.paragraph(),
                benefit: faker.lorem.text() ,
                categoriesId: categoryList[Math.floor(Math.random()*categoryList.length)].id
            }

            jobList.push(job);
        })
    }

    return jobList;
}

//random post
const randomPostList = (n) => {
    if (n <= 0 ) return [];
    const postList = [];

    // loop and push company
    Array.from(new Array(n)).forEach (() => {
        const post = {
            id: faker.datatype.uuid(),
            title: faker.lorem.sentence(),
            salary: "$1500",
            time: Date.now(),
            work_address: faker.address.streetAddress() + ", " + faker.address.cityName(),
            time_create: Date.now(),
            createdAt: Date.now(),
            time_end_apply: Date.now(),
            logoUrl: faker.image.business(100,100),
            createdAt: Date.now()
        }

        postList.push(post)
    })

    return postList;
}

(() => {
    //random data
    const companyList = randomCompanyList(10);
    const categoryList = randomCategoryList(20);
    const jobList = randomJobList(companyList, categoryList, 5)
    const postList = randomPostList(20);

    //prepare db object
    const db = {
        categories: categoryList,
        jobs: jobList,
        companies: companyList,
        posts: [],
    };

    //write db object  to json.db
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data successfully');
    });

})();