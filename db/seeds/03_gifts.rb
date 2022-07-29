require 'faker'

User.all.each do |user|
  num_gifts = rand(5..10)
  (0..num_gifts).each do
    price_low = rand(5..50) * 100
    price_high = price_low + (rand(5..50) * 100)

    create_data = {
      title: "#{Faker::App.name} #{Faker::Coffee.blend_name}",
      description: Faker::Lorem.paragraph(sentence_count: 3, supplemental: true, random_sentences_to_add: 4),
      price_low: price_low,
      price_high: price_high,
      asker: user,
      owner: user,
    }

    if rand() > 0.8
      group = user.gift_groups[0]
      group_members = group.users

      claimer_id = nil
      while claimer_id.nil?
        claimer_id = rand(1..group_members.count)
        if claimer_id == user[:id]
          claimer_id = nil
        end
      end

      create_data[:claimer] = User.find(claimer_id)
    end

    Gift.create!(create_data)
  end
end
