<?php

use PHPUnit\Framework\TestCase;
use Server\Library\Services\Validator;

class ValidatorTest extends TestCase
{

    public function test_that_validator_has_validate_method()
    {
        $exists = method_exists(new Validator, 'validate');
        $this->assertTrue($exists);
    }
}
