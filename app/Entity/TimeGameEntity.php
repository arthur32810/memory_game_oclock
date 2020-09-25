<?php


namespace App\Entity;

use DateTime;

class TimeGameEntity
{

    protected $id;
    protected $time;

    public function __construct($values = [])
    {
        if(!empty($values))
        {
            $this->hydrate($values); //on appelle l'hydration quand un tableau de valeur est donné
        }
    }

    public function hydrate(array $data) //on hydrate notre entitée
    {
        foreach($data as $key => $value)
        {
            $method = 'set'.ucfirst($key);

            if(method_exists($this, $method))
            {
                $this->$method($value);
            }
        }
    }


    /**
     * @param int $id
     */
    public function setId($id)
    {
        $id = (int) $id;

        if(is_int($id))
        {
            $this->id = $id;
        }

    }


    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return DateTime
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * @param DateTime $time
     */
    public function setTime($time)
    {
        $this->time = $time;
    }





}