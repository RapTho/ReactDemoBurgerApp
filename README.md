This is a small demo project to practice the React JavaScript framework.

Find the app here: https://react-burger-builder-4a2cc.web.app/

![App preview](https://github.com/RapTho/ReactDemoBurgerApp/blob/main/readme_image.jpg)

The app supports the following features:
- Sign up / Login users
- Logout
- Build and order (store on DB) burgers
- Provide an order summary including the ingredients and a calculated price
- Show users past orders when signed in

Technical optimizations
- Optimized for mobile use (different designs for mobile/desktop)
- Lazy loading parts of the app<br>
  Not all components are loaded initially. On request, the app fetches the less frequently used components automatically and renders them.
- Single Page application
- Store JSON Webtoken in localStorage after a successful login
- Try to automatically authenticate users if a valid token is stored in localStorage
- Orders only visible once signed in
- User can only fetch his/her specific orders

Learned all of this in an excellent Udemy course: https://www.udemy.com/course/react-the-complete-guide-incl-redux/
