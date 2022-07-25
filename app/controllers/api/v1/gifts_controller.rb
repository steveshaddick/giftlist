class Api::V1::GiftsController < Api::V1::BaseController

  def update
    if user_signed_in?
      gift = Gift.find(params[:id])

      # Update the claimer
      if params.has_key?(:claimer_id)
        if gift[:claimer_id].nil?
          gift.update(claimer_id: current_user[:id])
          gift.save
        else
          puts "ERROR! Gift requested by #{current_user[:id]} already claimed by #{gift[:claimer_id]}"
        end
      end
    end
  end
end
