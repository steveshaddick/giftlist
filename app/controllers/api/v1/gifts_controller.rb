class Api::V1::GiftsController < Api::V1::BaseController

  def update
    if user_signed_in?
      gift = Gift.find(params[:id])

      # Update the getter
      if params.has_key?(:getter_id)
        if gift[:getter_id].nil?
          gift.update(getter_id: current_user[:id])
          gift.save
        else
          puts "ERROR! Gift requested by #{current_user[:id]} already being gotten by #{gift[:getter_id]}"
        end
      end
    end
  end
end
