require 'faker'

default_users = [
    {
        name: "Steve Shaddick",
        email: "steveshaddick@gmail.com",
    }
]

default_users.each.with_index(1) do |new_user, index|
    user = User.find_by_id(index)
    unless user
        user = User.new({
            email: new_user[:email],
            name: new_user[:name],
            referring_email: "test@test.com",
            password: "password",
            password_confirmation: "password",
        })
        user.save
    end
end

(1..10).each do
    user = User.new({
        name: Faker::Name.unique.name,
        email: Faker::Internet.unique.email,
        referring_email: "test@test.com",
        password: "password",
        password_confirmation: "password",
    })
    user.save
end
