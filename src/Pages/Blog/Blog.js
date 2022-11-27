import React from 'react';

const Blog = () => {
    return (
        <div className='my-12 flex flex-col gap-8'>
            <div className='p-8 flex flex-col gap-5 bg-base-200 rounded-lg'>
                <h2 className='text-3xl font-bold'>What are the different ways to manage a state in a React application?</h2>
                <p>There are four main types of state you need to properly manage in your React apps:
                </p>
                <ul>
                    <li>Local state</li>
                    <li>Global state</li>
                    <li>Server state</li>
                    <li>URL state</li>
                </ul>
                <p>Local (UI) state – Local state is data we manage in one or another component. Local state is most often managed in React using the useState hook.</p>
                <p>Global (UI) state – Global state is data we manage across multiple components. Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.</p>
                <p>Server state – Data that comes from an external server that must be integrated with our UI state. Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state</p>
                <p>URL state – Data that exists on our URLs, including the pathname and query parameters. URL state is often missing as a category of state, but it is an important one. In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!</p>
            </div>
            <div className='p-8 flex flex-col gap-5 bg-base-200 rounded-lg'>
                <h2 className='text-3xl font-bold'>How does prototypical inheritance work?</h2>
                <p>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.
                </p>
            </div>
            <div className='p-8 flex flex-col gap-5 bg-base-200 rounded-lg'>
                <h2 className='text-3xl font-bold'>What is a unit test? Why should we write unit tests?</h2>
                <p>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important. In his book "Working Effectively with Legacy Code", author Michael Feathers states that such tests are not unit tests when they rely on external systems: “If it talks to the database, it talks across the network, it touches the file system, it requires system configuration, or it can't be run at the same time as any other test." <br /> <br />
                Best practices suggest that developers first run all unit tests or a group of tests locally to make sure any coding changes don’t disrupt the existing code. However, consider the human factor: A developer might forget to run unit tests after making changes and submit potentially non-working code to a common branch. To avoid this, many companies apply a continuous development approach. Tools for continuous integration are used for this, allowing developers to run unit tests automatically. Thus, any unwanted changes in the code will be detected by a cold, logical machine.
                </p>
            </div>
            <div className='p-8 flex flex-col gap-5 bg-base-200 rounded-lg'>
                <h2 className='text-3xl font-bold'>React vs. Angular vs. Vue?</h2>
                <p>React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library[3] for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.[4][5][6] React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality. <br />
                <br />
                AngularJS is a discontinued free and open-source JavaScript-based web framework for developing single-page applications. It was maintained mainly by Google and a community of individuals and corporations. It aimed to simplify both the development and the testing of such applications by providing a framework for client-side model–view–controller (MVC) and model–view–viewmodel (MVVM) architectures, along with components commonly used in web applications and progressive web applications.
                <br /> <br />
                Vue.js features an incrementally adaptable architecture that focuses on declarative rendering and component composition. The core library is focused on the view layer only.[4] Advanced features required for complex applications such as routing, state management and build tooling are offered via officially maintained supporting libraries and packages.
                </p>
            </div>
        </div>
    );
};

export default Blog;