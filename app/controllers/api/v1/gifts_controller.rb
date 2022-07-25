class Api::V1::GiftsController < Api::V1::BaseController

  def update
    if user_signed_in?
      gift = Gift.find(params[:id])

      # Update the claimer
      if params.has_key?(:claimer_id)
        new_claimer_id = params[:claimer_id]
        if gift[:claimer_id].nil? && current_user[:id] === current_user[:id]
          gift.update(claimer_id: current_user[:id])
          gift.save
        elsif new_claimer_id.nil? && gift[:claimer_id] === current_user[:id]
          gift.update(claimer_id: nil)
          gift.save
        else
          puts "ERROR! Gift #{gift[:id]} new claimer: #{new_claimer_id} existing claimer: #{gift[:claimer_id]}"
        end
      end
    end
  end
end
