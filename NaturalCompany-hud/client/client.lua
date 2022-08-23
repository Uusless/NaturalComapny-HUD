    print('^4Natural Company [HUD] | ^0v 0.0.1 | ^4Started')

    CreateThread(function()
        while true do 
            local ped  = PlayerPedId()
            local sleep = 5500;
            if  Config.DisplayRadar then 
                if not IsPedInAnyVehicle(ped) then
                DisplayRadar(false)
                sleep = 6000;
            elseif IsPedInAnyVehicle(ped, true) then 
                DisplayRadar(true)
                sleep = 5500;
                end 
            end
            if Config.CantShootInDriving then
                local IsIn = GetVehiclePedIsIn(ped, false) 
                    if GetPedInVehicleSeat(IsIn, -1) == ped then
                            SetPlayerCanDoDriveBy(PlayerId(), false)
                          else
                            SetPlayerCanDoDriveBy(PlayerId(), true)
                          end
                end
            Wait(sleep)
        end
    end)

    local hunger = nil
    local thirst = nil
  
    CreateThread(function()
        while true do 
            Wait(5500)
            TriggerEvent('esx_status:getStatus', 'hunger', function(hngr) 
                hunger = hngr.val / 10000 
            end)
                TriggerEvent('esx_status:getStatus', 'thirst', function(whtr) 
                thirst = whtr.val / 10000 
            end)
        end
    end)

    local SeatBelt = nil

    CreateThread(function()
        while true do
        local s = 1450;
        local ped = PlayerPedId();
        local entity = GetVehiclePedIsUsing(ped)
        local ht = (GetEntityHealth(ped) - 100)
        local Oxigen = GetPlayerUnderwaterTimeRemaining(PlayerId())*10
            Notification()

    if  Config.CarHudUI then
        if IsPedInAnyVehicle(ped) and not IsPauseMenuActive() then

            local fl = GetVehicleFuelLevel(entity)
            local eng = (GetVehicleEngineHealth(entity) - 100)
            
        if Config.NotificationNatural then
        if fl == 20 then 
            exports['natural-notification']:Notification('notification', 'Vehiculo', 'Busca una gasolinera cerca, te estas quedando sin gasolina', 4500)
        end

        if eng == 20 then 
            exports['natural-notification']:Notification('notification', 'Vehiculo', 'Busca un mecanico cerca, tu vehiculo esta muy dañado', 4500)
        end
    end


            SendNUIMessage({
                vh = IsPedInAnyVehicle(ped);
                rpm = GetVehicleCurrentRpm(entity);
                fuel = fl;
                engine = eng;
                gear = GetVehicleCurrentGear(entity);
                speed = (GetEntitySpeed(entity) * 3.6)
            })
            s = 1650;
        else 
            s = 1550;
        end
    else 
        s = 1550;
        Wait(200)
        -- end
    end

        Wait(s)
            SendNUIMessage({
                health = ht;
                armour = GetPedArmour(ped);
                IsSwiming = IsPedSwimmingUnderWater(ped);
                cfg = IsPauseMenuActive();
                Ox = Oxigen;
                voice = NetworkIsPlayerTalking(PlayerId());
                hng = hunger;
                inMap = IsRadarEnabled();
                notMap = IsRadarHidden();
                thr = thirst
            })
        end
    end)


    function Notification()
        if Config.NotificationNatural then 
        local ped = PlayerPedId();
        local entity = GetVehiclePedIsUsing(ped)
        local ht = (GetEntityHealth(ped) - 100)
        local Oxigen = GetPlayerUnderwaterTimeRemaining(PlayerId())*10

        if hunger == 45 then 
            exports['natural-notification']:Notification('notification', 'Cuerpo', 'Trata de comer algo, tu barriga tiene un poco de hambre !', 4500)
        end
        if thirst == 45 then 
            exports['natural-notification']:Notification('notification', 'Cuerpo', 'Trata de tomar algo de agua, tu boca tiene un poco de sed !', 4500)
        end

        if hunger == 11 then 
            exports['natural-notification']:Notification('notification', 'Cuerpo', 'Sientes como te desmayas, come algo urgentemente', 4500)
        end
        if thirst == 11 then 
            exports['natural-notification']:Notification('notification', 'Cuerpo', 'Te sientes mareado, tomate algo urgentemente', 4500)
        end

        if ht == 44 then 
            exports['natural-notification']:Notification('notification', 'Cuerpo', 'Ponte una venda, tu cuerpo esta un poco adolorido', 4500)
        end

        if ht == 11 then 
            exports['natural-notification']:Notification('notification', 'Cuerpo', 'Busca un medico urgentemente estas apunte de desmayarte', 4500)
        end

        if Oxigen == 45 then
            exports['natural-notification']:Notification('notification', 'Cuerpo', 'Te estas quedando sin oxigeno, tu cuerpo ya no aguanta mas', 4500)
            end
        end
    end
