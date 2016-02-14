# Getting Started

## System Dependencies

1. Ensure you're using ruby 2.0.0 or newer. If needed, use rvm to install a newer version [https://rvm.io/rvm/install](https://rvm.io/rvm/install)

        $ ruby -v
        ruby 2.3.0p0 (2015-12-25 revision 53290) [x86_64-darwin15]

2. Ensure you have node installed. V4 or newer is recommended. If needed, use nvm to install a newer version [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

        $ node -v
        v5.5.0

3. Ensure you have sqlite3. If not, use [homebrew](http://brew.sh/) to install it.

        $ sqlite3 --version
        3.8.10.2 2015-05-20 18:17:19 2ef4f3a5b1d1d0c4338f8243d40a2452cc1f7fe4

## Setup Instructions

1. Clone the repository

        $ git clone https://github.com/mariusz360/palette_pal.git
        $ cd palette_pal

2. Install gem dependencies:

        $ gem install bundler rails

3. Bundle install

        $ bundle install

4. Create a database and run the migrations

        $ rake db:create && rake db:migrate
        
5. Start the server

        $ rails s
        
6. Visit localhost:3000 in your browser
