### Ballet Company App

## Models

# User

- name: string, required
- email: email, required
- profile Picture: optional
- birthday: Date, optional
- isAdministrator: boolean, default: false
- preferences: [ Item ]
- orders: [ Order ]
- creation_date: Date
- update_date: Date

# Order

- item: Item
- quantity: Number
- in_process: boolean
- received: boolean
- creator: User
- creation_date: Date
- update_date: Date

# Item

- title: string
- brandName: string, required
- modelName: string, required
- link/image link
- size: number, required
- color
- gender: m,f,unisex
- material (optional)
- maker (if item is a freed pointe shoe)

# Post

- title: String, required
- description: String, optional
- image: Image, optional
- creationDate: Date
- updateDate: Date
- creator ?
- participants: [ User ], optional
- importantFlag: boolean, default: false

###

## Endpoints

METHOD | PATH | ACTION |

# authentication

post | authentication/sign-up | create new user, redirect to user's profile |
post | authentication/sign-in | sign in registered user |
get | authentication/verify | get information on user |
patch | authentication/profile | update user profile |

# home page and profile page

get | / | home page, list posts sorted by date |
get | /:id | display user profile page |

# handle orders

get | /order | display order form to authenticated user|
post | /order | submit order |
get | /order/list | list all orders, for authenticated admin user |
patch | /order/:id | edit order, for authenticated user who created order & admin |
delete | /order/:id | delete order, for authenticated user who created order |

# handle database of order items

get | /item | display list of all items that can be ordered
get | /item/create | display form to add new item, for authenticated admin user |
post | /item/create | submit item |
get | /item/:id | display item details |
patch | /item/:id | edit item details, for authenticated admin user |
delete | /item/:id | delete item from database, for authenticated admin user |

# news posts

get | /post | display form to create a post for authenticated admin user|
post | /post | submit post to be displayed |
patch | /post/:id | edit post, for authenticated admin user |
delete | /post/:id | delete post, for authenticated user admin |

# User

-> can create an account
-> can edit their profile
-> can place an order
-> can edit orders which they created
-> can can delete orders which they created if they are not marked in_process
-> can create general posts
-> can edit posts which they created
-> can delete posts which they created

# User Admin

-> can create and account
-> can edit their profile
-> can view all orders
-> can mark all orders as in process, or received
-> can delete all orders which are received
-> can create general and administrative posts
-> can edit posts which they created
-> can delete all posts

# Edit Profile Page

-> edit name, email, password
-> set profile picture
-> set birthday
-> set default size for pointe shoes, soft shoes and dress size (which will be autofilled in order form)

# Order Page

-> chose whether to place an order for pointe shoes, soft shoes or other
-> display order form for selected option

# Order Overview Page

-> display a list of all orders

# Home page

-> main section: display admin posts/announcements
-> aside section: display dancer posts/announcements

###############################################################################

## TO DO

- trigger weekly email to admin
- pin for login of admin

- item model?
- items list

- announcement model
- announcement creation form for admin and user
- announcement edit and delete form
- announcement display

- deploy

# Item

(maybe not enums as it will be too hard to change later ? )

- item: string, req
  -brand: string
  -model: string
  -size: string or number
  -width: string
  -color: string
  -maker: string

whenever an order is placed a matching item is either found in the database and referred to in the order or is created and then referred to in the order

OR: sizes, widths, colors and makers are arrays listing all available versions of an item-> items are displayed only in catalogue form and not referred to in orders

OR: size, with and color (and maker) are referred to only in the order model and the item is independent of that and referred to by the order model as well

- announcement model, create, edit, delete and display (for admin to display on home page main view and for dancers to display on home page aside view)

## TODO as of 15.04.

- edit profile picture and announcement picture without losing previous one ✅
- default profile picture ✅
- show profile picture with announcement ✅
- clean up warnings so app can deploy ✅
- clean up database from old users etc ✅
- preload user preferences when placing an order✅
- favicon ✅
- clean up styling and code structure ✅

# Saturday

- WEEKLY EMAIL (logic and styling) 🔆
- pin guard for admin sign up

- error handling

- style for mobile

- why is order edit triggering retrun to home page? ❗

# final touches

- add more photos to styling
- finish adding pointe shoe makers

- password reset change and/ or reset function

# nice to have

- custom order item
  (- item catalogue)
